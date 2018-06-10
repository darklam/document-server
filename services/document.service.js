const Document = require('../models/document.model');

exports.newDocument = document => Document.create(document);

exports.findDocument = query => Document.findOne(query);

exports.findDocuments = query => Document.find(query);
