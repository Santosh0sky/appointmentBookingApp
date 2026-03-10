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

export async function updateAppointment(req, res) {
  try {
    const { id } = req.params;
    const { username, phone, email } = req.body;

    if (!username || !phone || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'username, phone and email are required',
      });
    }

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ status: 'error', message: 'Appointment not found' });
    }

    await appointment.update({ username, phone, email });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ status: 'error', message: 'Appointment not found' });
    }

    await appointment.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
