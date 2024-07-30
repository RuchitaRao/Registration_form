const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/DataBase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  age: Number,
  gender: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Serve static files

// Register route
app.post('/register', (req, res) => {
  const { name, email, password, phone, age, gender } = req.body;

  const newUser = new User({ name, email, password, phone, age, gender });
  newUser.save()
    .then(() => {
      res.redirect('success.html'); // Redirect to success page
    })
    .catch(err => {
      console.error(err);
      // Handle error, e.g., send an error message to the client
      res.status(500).send('Error registering user');
    });
});

// Serve the success page
app.get('success.html', (req, res) => {
  res.sendFile(__dirname + 'success.html');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});