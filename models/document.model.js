const mongoose = require('mongoose');

const { Schema } = mongoose;

const documentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  dateUploaded: Date,
  documentName: {
    type: String,
    required: true,
  },
});

const documentModel = mongoose.model('Document', documentSchema);

module.exports = documentModel;
