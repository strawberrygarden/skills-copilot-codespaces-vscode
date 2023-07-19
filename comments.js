// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const Comment = require('./comment.model');
const cors = require('cors');
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Get all comments
app.get('/comments', (req, res) => {
  Comment.find({}).then((comments) => {
    res.json(comments);
  });
});

// Get one comment
app.get('/comments/:id', (req, res) => {
  Comment.findOne({ _id: req.params.id }).then((comment) => {
    res.json(comment);
  });
});

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = new Comment({
    title: req.body.title,
    body: req.body.body,
  });
  comment.save().then((comment) => {
    res.json(comment);
  });
});

// Update a comment
app.patch('/comments/:id', (req, res) => {
  Comment.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        body: req.body.body,
      },
    }
  ).then((comment) => {
    res.json(comment);
  });
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  Comment.findOneAndRemove({ _id: req.params.id }).then((comment) => {
    res.json(comment);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
