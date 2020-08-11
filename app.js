const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

const port = 3000;

/* app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from server side', app: 'Natours' });
});
 */

//*middle ware */
app.use(morgan('dev'));
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// *ROUTE HANDLERS

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tours },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log('Error in writing files..');
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
});

app.get('/api/v1/tours/:id', (req, res) => {
  const tourId = req.params.id * 1;
  const tour = tours.find((el) => el.id === tourId);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      data: {
        message: 'No tours found with this ID',
      },
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const tourId = req.params.id * 1;
  const tour = tours.find((el) => el.id === tourId);
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      data: {
        message: 'No tours found with this ID',
      },
    });
  }

  const foundTour = Object.assign(tour, req.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log('Error in updating files..');
      res.status(200).json({
        status: 'success',
        data: {
          tour: foundTour,
        },
      });
    }
  );
});
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'failure',
    message: 'Yet to be implemented',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'failure',
    message: 'Yet to be implemented',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'failure',
    message: 'Yet to be implemented',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'failure',
    message: 'Yet to be implemented',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'failure',
    message: 'Yet to be implemented',
  });
};

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
