const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();

const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');

app.use(morgan('dev'));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');
// handling the CORS CROSS ORIGIN Resource Sharing error here
app.use(cors());
// bodyParser here extract the json and make it readable
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter }).single('productImage'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// using the method here for the all the route and handle all the ROUTES here
app.use(productRoutes);
app.use(userRoutes);

// setting up the error handling here
app.use((req, res, next) => {
  const err = new Error('Not Found!');
  // setting the status property to show there
  err.status = 404;
  next(err);
});

// handling the passed errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    ERROR: err.message
  });
});

// connecting the mongo to the application
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log(`Connected Successfully to MongoDB!`);
    app.listen(process.env.PORT, () => {
      console.log(`Server running on PORT: ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(`Connection Failed to MongoDB : ${err}`));
