const Cell = require("../../models/cell/Cell");
const User = require("../../models/User");


module.exports = {
  createNew: async (req, res) => {
    let {cell_name, cell_location, cell_leader} = req.body;

    let findCell = await Cell.findOne({cell_name: cell_name.toLowerCase()});
    let cellLeader = await User.findById({_id: cell_leader});

    cellLeader.cell_leader = true;
    await cellLeader.save();
    
    if(!cellLeader) return res.status(200).json({
      success: false,
      message: "Cell leader not found",
      data: null
    })
 
    // console.log(cellLeader)

    if(findCell) return res.status(200).json({
      success: false,
      message: "Cell name already exists",
      data: null
    })

    let newCell = await new Cell({
      cell_name: cell_name.toLowerCase(), 
      cell_location, 
      cell_leader,
      cell_members: cell_leader
    });

    cellLeader.cell_leader = true;
    cellLeader.cell = newCell._id;
    await cellLeader.save();

    newCell.save()
      .then(cell => {
        if (cell) {
          res.status(201).json({
            success: true,
            message: "Cell created successfully",
            data: cell
          })
        }else{
          res.status(200).json({
            success: false,
            message: "Could not create cell",
            data: null
          })
        }
      })
      .catch(err => console.log(err))
  },

  getAll: async (req, res) => {
    await Cell.find({})
      .populate("cell_members")
      .populate("cell_leader")
      .sort( {_id: -1} )
      .then(cells => {
        if (cells) return res.status(200).json({
          success: true,
          message: "All cells",
          data: cells
        });

        res.status(200).json({
          success: false,
          message: "Unable to get cells",
          data: null
        })
      })
      .catch(err => {console.log(err)})
  },

  getOne: async (req, res) => {
    let cellId = req.params.id;

    Cell.findById({_id: cellId})
      .populate("cell_members")
      .populate("cell_leader")
      .then(cell => {
        if (cell) {
          res.status(200).json({
            success: true,
            message: "Cell found",
            data: cell
          })
        }else{
          res.status(200).json({
            success: false,
            message: "Cell not found",
            data: null
          })
        }
      })
      .catch(err => {
        if(err) return res.status(200).json({
          success: false,
          message: "Could not find cell",
          data: null
        })
      })
  },

  editOne: async (req, res) => {
    let cellId = req.params.id;
    let {cell_name, cell_location} = req.body;

    let updateCell = await Cell.findByIdAndUpdate({_id: cellId}, {cell_name: cell_name.toLowerCase(), cell_location});

    if (updateCell) return res.status(200).json({
      success: true,
      message: "Cell updated successful",
      data: updateCell
    })

    res.status(200).json({
      success: false,
      message: "Unable to update cell",
      data: null
    })
  },

  deleteOne: async (req, res) => {
    let cellId = req.params.id;

    let seeCell = await Cell.findOne({_id:cellId}).populate("cell_members").populate("cell_leader");

    if (!seeCell) return res.status(200).json({
      success: false,
      message: "Cell not found",
      data: null
    })

    let user = await User.findById({_id: seeCell.cell_leader._id});
    user.cell = null;
    user.cell_leader = false;
    user.save();
    
    await seeCell.cell_members.forEach(member => {
      member.cell = null;
      member.cell_leader = false;
    });

    await seeCell.save()
      .then(async cellToDelete => {
        if(cellToDelete) {
          let deleteCell = await Cell.findByIdAndDelete({_id: cellId});

          if (deleteCell) return res.status(200).json({
            success: true,
            message: "Cell delete successfully",
            data: deleteCell
          })

          res.status(200).json({
            success: false,
            message: "Unable to delete cell",
            data: null
          })
        }else{
          res.status(200).json({
            success: false,
            message: "Unable to delete cell",
            data: null
          })
        }
      })
      .catch(err => {
        if(err) {
          res.status(200).json({
            success: false,
            message: "Unable to delete cell",
            data: err
          })
        }
      });
  },


  removeMember: async (req, res) => {
    let cellId = req.params.id;
    let {userId} = req.body;

    let seeCell = await Cell.findOne({_id:cellId}).populate("cell_members").populate("cell_leader");

    if (!seeCell) return res.status(200).json({
      success: false,
      message: "Cell not found",
      data: null
    })

    let user = await User.findById({_id: userId});
    user.cell = null;
    user.cell_leader = false;
    console.log(seeCell)
    // user.save();

    // seeCell.cell_member.pop()
    
  },
  
  assignLeader: async (req, res) => {
    let cellId = req.params.id;
    // asign cell leader make all others "false as cell leaders so not to have duplicate cell leaders"
  },

  addMembers: async (req, res) => {
    let cellId = req.params.id;
    let {members} = req.body;
    let cell = await Cell.findOne({_id: cellId});

    members.forEach(member => {
      cell.cell_members.push(member);
    });

    await cell.save()
      .then(updatedCell => {
        if(updatedCell) return res.status(200).json({
          success: true,
          message: "Members added to cell",
          data: updatedCell
        })
      })
      .catch(err => {
        if(err) return res.status(200).json({
          success: false,
          message: "Unable to add members to cell",
          data: null
        })
      });
  },

  allMembers: async (req, res) => {
    let cellId = req.params.id;

    await Cell.findById({_id: cellId})
      .populate("cell_members")
      .populate("cell_leader")
      .sort( {_id: -1} )
      .then(cell => {
        if (cells) return res.status(200).json({
          success: true,
          message: "All cell members",
          data: cell.cell_members
        });

        res.status(200).json({
          success: false,
          message: "Unable to get cell members",
          data: null
        })
      })
      .catch(err => {console.log(err)})
    
  },


  notInCell: async (req, res) => {
    let users = await User.find({cell: null});
    if(users) {
      res.status(200).json({
        success: true,
        message: "All users without cells",
        data: users
      })
    }else{
      res.status(200).json({
        success: false,
        message: "Could not get users",
        data: null
      })
    }
  },
  
  userCell: async (req, res) => {
    let userId = req.user._id;
    // console.log(userId)

    Cell.findOne({cell_members: {_id: userId}})
      .populate("cell_members")
      .populate("cell_leader")
      .then(cell => {
        if (cell) {
          res.status(200).json({
            success: true,
            message: "Logged in user cell",
            data: cell
          })
        }
      })
      .catch(err => {
        // console.log(err)
        if(err) return res.status(200).json({
          success: false,
          message: "Could not find cell",
          data: null
        })
      })
  }
}