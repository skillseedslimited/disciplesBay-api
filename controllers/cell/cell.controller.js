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
    // console.log( seeCell.cell_leader)

    if (!seeCell) return res.status(200).json({
      success: false,
      message: "Cell not found",
      data: null
    });

    if(seeCell.cell_leader && seeCell.cell_leader._id == userId) {
      console.log(seeCell.cell_leader.cell_leader)
      seeCell.cell_leader.cell = null
      seeCell.cell_leader.cell_leader = false
      seeCell.cell_leader = null
    }
    
    let user = await User.findById({_id: userId});
    if(!user) return res.status(200).json({
      success: false,
      message: "Unable to remove cell member, no such member",
      data: null
    });

 
      user.cell = null;
      user.cell_leader = false;
      user.save();


    let new_members = seeCell.cell_members.filter(member => member._id != userId);
    seeCell.cell_members = new_members;
    seeCell.save();
    
    if(new_members) {
      res.status(200).json({
        success: true,
        message: "Cell Member removed",
        data: null
      })
    }else{
      res.status(200).json({
        success: true,
        message: "No such member",
        data: null
      })
    }   
  },
   
  assignLeader: async (req, res) => {
    let cellId = req.params.id;
    let {userId} = req.body;

    let cell = await  await Cell.findById({_id: cellId}).populate("cell_members").populate("cell_leader");

    if(!cell) return res.status(200).json({
      success: false,
      message: "Cell not found",
      data: null
    });

    if(cell.cell_leader && cell.cell_leader._id == userId) return res.status(200).json({
      success: false,
      message: "This member is already a cell leader",
      data: null
    });

    let oldLeader = await User.findOne({_id: cell.cell_leader._id});
    oldLeader.cell_leader = false;
    oldLeader.save();

    let newLeader = await User.findOne({_id: userId});
    if (!newLeader) return res.status(200).json({
      success: false,
      message: "Invalid user",
      data: null
    });

    newLeader.cell_leader = true;
    newLeader.save();

    console.log(newLeader)
    cell.cell_leader = userId;
    cell.save()
      .then(updatedCell => {
        if(updatedCell) return res.status(200).json({
          success: true,
          message: "Cell leader assigned successfully",
          data: updatedCell
        })
      })
      .catch(err => {
        if(err) return res.status(200).json({
          success: false,
          message: "Unable to assign cell leader",
          data: null
        })
      });


  },

  addMembers: async (req, res) => {
    let cellId = req.params.id;
    let {members} = req.body;
    let cell = await Cell.findOne({_id: cellId});

    if(cell) {
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
    }else{
      res.status(200).json({
        success: false,
        message: "Unable to add members to cell, cell not found",
        data: null
      })
    }
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
        }else{
          res.status(200).json({
            success: false,
            message: "You do not belong to any cell",
            data: null
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