const express = require('express');
const multer = require('multer');
const path = require('path');
const Document = require('../services/document.service');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `upload-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    path.extname(file.originalname) !== '.png' &&
    path.extname(file.originalname) !== '.jpg'
  ) {
    return cb(new Error('Only image uploads are allowed ;)'));
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

router.get('/', (req, res) => {
  res.render('document', { username: req.session.username });
});

router.post('/add', upload.single('image'), (req, res, next) => {
  const documentPath = req.file.path;
  const { description, docId } = req.body;
  const dateUploaded = Date.now();
  const documentName = req.file.filename;

  if (
    !description ||
    !docId ||
    !path
  ) {
    res.json({
      error: 'Incomplete data',
    });
    return;
  }

  const docData = {
    path: documentPath,
    id: docId,
    description,
    dateUploaded,
    documentName,
  };

  Document.newDocument(docData)
    .then((doc) => {
      console.log(doc);
      res.redirect('/document');
    })
    .catch(error => next(error));
});

module.exports = router;
