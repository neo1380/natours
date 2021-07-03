const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tours },
  });
};

exports.createTour = (req, res) => {
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
};

exports.getAllTourById = (req, res) => {
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
};

exports.updateTour = (req, res) => {
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
};
