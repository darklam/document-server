const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const Document = require('../services/document.service');

const router = express.Router();


router.get('/img/:filename', (req, res, next) => {
  fs.readFile(path.join(__dirname, '..', 'uploads', req.params.filename)).then((file) => {
    res.send(file);
  }).catch(error => next(error));
});

router.get('/download/:filename', (req, res) => {
  res.download(path.join(__dirname, '..', 'uploads', req.params.filename));
});

router.get('/', (req, res, next) => {
  Document.findDocuments({}).then((docs) => {
    const out = {
      res: [],
    };

    docs.forEach((doc) => {
      out.res.push(doc);
    });

    res.render('search', { out, username: req.session.username });
  }).catch(error => next(error));
});

module.exports = router;
