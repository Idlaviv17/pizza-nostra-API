const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const pagosRouter = require('./controllers/pagos');
const salariosRouter = require('./controllers/salarios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use("/api/pagos", pagosRouter);
app.use("/api/salarios", salariosRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});