// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const session = require('express-session');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { 
//     secure: false ,
//     maxAge: 60 * 60 * 1000
// } // Set to true if using https
// }));

// mongoose.connect('mongodb://localhost:27017/cp3DB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/problems', require('./routes/problems'));
// app.use('/api/topics', require('./routes/topics'));
// app.use('/api/admin', require('./routes/admin'));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 60 * 60 * 1000
  } // Set to true if using https
}));

mongoose.connect('mongodb://localhost:27017/cp3DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/problems', require('./routes/problems'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api/admin', require('./routes/admin'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));