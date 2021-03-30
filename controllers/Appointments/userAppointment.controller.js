const Appointments = require("../../models/Appointments");
const Apppointments = require("../../models/Appointments");

module.exports = {
  allMyAppointments: async (req, res) => {
    Apppointments.find({user: req.user._id})
      .then(appointments => {
        res.send(appointments)
      })
      .catch(err => console.log(err));
  },

  createNew: async (req, res) => { 
    // console.log("Loggedin User===>>>>>>", req.user);
    let {title, description} = req.body;

    let newAppointment = new Appointments({
      user: req.user._id,
      title, 
      description
    });

    newAppointment.save()
      .then(data => {
        res.status(201).json({
          success: true,
          data
        })
      })
      .catch(err => console.log(err))

    // console.log("jiasodjasijdiasjdoiasjo::::::", newAppointment)

  }, 

  getOne: async (req, res) => {
    let appointmentId = req.params.id;

    Appointments.findById({_id: appointmentId})
      .then(appointment => {
        if (appointment != null) {
          res.status(200).json({
            success: true,
            message: "Found Successfully",
            data: appointment
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
      .catch(err => console.log(err))
  },

  editOne: async (req, res) => {
    let appointmentId = req.params.id;

    Appointments.findByIdAndUpdate({_id: appointmentId}, req.body)
      .then(updateAppointment => {
        if (updateAppointment != null){

          res.status(201).json({
            success: true,
            message: "Updated successfully",
            data: updateAppointment
          })

        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
      .catch(err => console.log(err))
  },

  deleteOne: async (req, res) => {
    let appointmentId = req.params.id;

    Appointments.findByIdAndDelete({_id: appointmentId})
      .then(deletedAppointment => {
        if (deletedAppointment != null) {
          res.status(200).json({
            success: true,
            message: "Deleted Successfully", 
            data: deletedAppointment
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
      .catch(err => console.log(err))
  }
}