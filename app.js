const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewsRouter');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongooseSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp')
const pug = require('pug');
const app = express();


app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','pug');
app.set('views',path.join(__dirname, 'views'));


// 1) GLOBAL MIDDLEWARES
// Serving static files
// Set Security HTTP Headers
// app.use(helmet());
app.use( helmet({ contentSecurityPolicy: false }) );

// Development logging
app.use(morgan('dev'));
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// Limit Request From Same API
const limiter = rateLimit({
  max:101,
  windowMs: 60 * 60 * 1000,
  message: 'To Many Requests From This IP, Please Try Again in an Hours!'
});
app.use('/api',limiter);

// Body Parser, readding dat from body in (req.body)

app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({ extended: true, limit: '10kb'}))
app.use(cookieParser());

// Data Sanitization against NoSQL query Injection
app.use(mongooseSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(hpp({
  whitelist:['duration',
  'ratingsQuantity',
  'ratingsAverage',
  'maxGroupSize',
  'difficulty',
  'price'
  ]}
));

app.use(compression());
// Test Middleware Here
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);
  next();
});



// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', reviewRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
