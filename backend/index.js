import express from 'express';
import cors from 'cors';
import sequelize from './utils/dbConnection.js';
import appointmentRouter from './routes/appointmentRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.use('/api/appointments', appointmentRouter);

async function start() {
  try {
    await sequelize.sync();
    console.log('Sequelize sync complete (appointments table ensured)');

    app.listen(PORT, () => {
      console.log(`Backend server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

start();
