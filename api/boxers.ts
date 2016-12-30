import * as express from 'express';
import Boxers from './../models/Boxers';
let router = express.Router();

router.get('/boxers', (req, res, next) => {
  Boxers.find().then((data) => {
    res.json(data);
  });
});

router.post('/boxers/:id', (req, res, next) => {
  Boxers.update(
    { _id: req.params.id },
    req.body,
    { upsert: true, setDefaultsOnInsert: true }, (e, data) => {
      res.json(data);
    });
});

export = router;
