import Appointment from '../models/Appointment.js';

export async function getAppointments(req, res) {
  try {
    const appointments = await Appointment.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function createAppointment(req, res) {
  try {
    const { username, phone, email } = req.body;

    if (!username || !phone || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'username, phone and email are required',
      });
    }

    const appointment = await Appointment.create({ username, phone, email });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
