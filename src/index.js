import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './controllers/auth.js';
import pagosRouter from './controllers/pagos.js';
import salariosRouter from './controllers/salarios.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Function for loadtesting
app.get('/heavy', (req, res) => {
  let total = 0;
  for (let i = 0; i < 50_000_000; i++) {
    total++;
  }
  res.send(`The result of the CPU intensive task is ${total}\n`);
});

app.use('/api/auth', authRouter);
// Routers for CRUD operations to database
app.use('/api/pagos', pagosRouter);
app.use('/api/salarios', salariosRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Worker pid = ${process.pid}`);
});
