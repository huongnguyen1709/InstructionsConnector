const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  postId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  rightAnswer: {
    type: String,
    required: true,
  },
  answer2: {
    type: String,
    required: true,
  },
  answer3: {
    type: String,
  },
  answer4: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = Question = mongoose.model('question', QuestionSchema);
