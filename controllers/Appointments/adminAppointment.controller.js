const Appointments = require("../../models/Appointments");
const NotificationAction = require("../../Actions/NotificationActions");
const User = require("../../models/User");

module.exports = {
  getAll: async (req, res) => {
    Appointments.find({})
      .populate("user")
      .sort( {_id: -1} )
      .then(appointments => {
        res.status(200).json(appointments)
      })
      .catch(err => {console.log(err)})
  },

  approveAppointment: (req, res) => {
    let appointmentId = req.params.id;
    let {appointment_date} = req.body;

    Appointments.findById({_id: appointmentId})
    .then(async appointment => {
      if (appointment != null) {
        let user = await User.findById(appointment.user).exec();
        console.log(user)
        NotificationAction.sendToUser(
          user,
          `Your appointment ${appointment.title} was approved`,
          'appointment',
          '#'
        );

        appointment.appointment_date = appointment_date;
        appointment.appointment_status = "Approved";
        appointment.save()
          .then(approvedeApp => {
            res.status(200).json({
              success: true,
              message: "Appointment approved",
              data: approvedeApp
            })
          })
          .catch(err => console.log(err));
      }else{
        res.status(200).json({
          success: false,
          message: "Appointment not found",
        })
      }
    })
    .catch(err => console.log(err))

  },

  approvedAppointments: async (req, res) => {
    Appointments.find({appointment_status: "Approved"})
      .then(allApproved => {
        if (allApproved != null) {
          
          res.status(200).json({
            success: true,
            message: "All approved appointments",
            data: allApproved
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
  },

  disapproveAppointment: async (req, res) => {
    let appointmentId = req.params.id;

    Appointments.findById({_id: appointmentId})
    .then(async appointment => {
      if (appointment != null) {
        let user = await User.findById(appointment.user).exec();
        console.log(user)

        NotificationAction.sendToUser(
          user,
          `Your appointment ${appointment.title} was disapproved`,
          'appointment',
          '#'
        );

        appointment.appointment_status = "Disapproved";
        appointment.message = req.body.message;
        await appointment.save()
          .then(approvedeApp => {
            res.status(200).json({
              success: true,
              message: "Appointment disapproved",
              data: approvedeApp
            })
          })
          .catch(err => console.log(err));
      }else{
        res.status(200).json({
          success: false,
          message: "Appointment not found",
        })
      }
    })
    .catch(err => console.log(err))

  },

  disapprovedAppointments: async (req, res) => {
    Appointments.find({appointment_status: "Disapproved"})
      .then(allDisapproved => {
        if (allDisapproved != null) {
          
          res.status(200).json({
            success: true,
            message: "All disapproved appointments",
            data: allDisapproved
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
  },

  pendingAppointments: async (req, res) => {
    Appointments.find({appointment_status: "Pending"})
      .then(allPending => {
        if (allPending != null) {
          
          res.status(200).json({
            success: true,
            message: "All pending appointments",
            data: allPending
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
  }, 

  completeAppointment: async (req, res) => {
    let appointmentId = req.params.id;

    Appointments.findById({_id: appointmentId})
      .then(appointment => {
        if (appointment != null) {

          appointment.completed = true;
          appointment.appointment_status = "Approved";

          appointment.save()
            .then(completedAppointment => {
              res.status(200).json({
                success: true,
                message: "Appointment completed",
                data: completedAppointment
              })
            })
            .catch(err => console.log(err));
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
      .catch(err => console.log(err))

  },

  completedAppointments: async (req, res) => {
    Appointments.find({completed: true})
      .then(allCompleted => {
        if (allCompleted != null) {
          
          res.status(200).json({
            success: true,
            message: "All completed appointments",
            data: allCompleted
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
  },

  rescheduleAppointment: async (req, res) => {
    let appointmentId = req.params.id;
    let {appointment_date} = req.body;

    Appointments.findByIdAndUpdate({_id: appointmentId}, {appointment_date, completed: false, rescheduled:true})
      .then(rescheduledAppointment => {
        if (rescheduledAppointment != null) {
          
          res.status(200).json({
            success: true,
            message: "Rescheduled appointment",
            data: rescheduledAppointment
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
      .catch(err => console.log(err));

  },

  rescheduledAppointments: async (req, res) => {
    Appointments.find({rescheduled: true})
      .then(allRescheduled => {
        if (allRescheduled != null) {
          
          res.status(200).json({
            success: true,
            message: "All rescheduled appointments",
            data: allRescheduled
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
  }
}