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
  Document.findDocuments({}).limit(100).then((docs) => {
    const out = {
      res: docs,
    };

    res.render('search', { out, username: req.session.username });
  }).catch(error => next(error));
});

router.post('/', (req, res, next) => {
  const desc = req.body.descriptionSearch;
  const { id } = req.body;

  let query;

  if (id && desc) {
    query = {
      $and: [
        { id },
        {
          description: {
            $regex: RegExp(desc, 'i'),
          },
        },
      ],
    };
  } else if (id) {
    query = {
      id,
    };
  } else if (desc) {
    query = {
      description: {
        $regex: RegExp(desc, 'i'),
      },
    };
  }

  Document.findDocuments(query)
    .then((docs) => {
      const out = {
        res: docs,
      };

      res.render('search', { out, username: req.session.username });
    }).catch(error => next(error));
});

module.exports = router;
