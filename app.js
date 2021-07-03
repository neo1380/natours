const express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const port = 3000;

/* app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from server side', app: 'Natours' });
});
 */

//*middle ware */
app.use(morgan('dev'));
app.use(express.json());

//* ROUTES */

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
