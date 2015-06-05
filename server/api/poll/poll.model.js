'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  question: String,
  option1: String,
  option2: String,
  user: String,
  option1Count: Number,
  option2Count: Number,
  limitType: String,
  limitVotes: Number,
  voteType: String,
  usersVoted: Array
});

module.exports = mongoose.model('Poll', PollSchema);
