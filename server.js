const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
  useCreateIndex: true, 
  useFindAndModify: false, 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => // console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  // console.log('UNHANDLED REJECTION! Shutting down...');
  // console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


