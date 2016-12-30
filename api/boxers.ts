import * as express from 'express';
import Boxers from './../models/Boxers';
let router = express.Router();

//get all
//TODO paginated
router.get('/boxers', (req, res, next) => {
  Boxers.find().then((data) => {
    res.json(data);
  });
});

//new
router.post('/boxers', (req, res, next) => {
  Boxers.create(req.body, (e, data) => {
    if(e) return res.json(e);
    res.json(data);
  })
});

//update
router.put('/boxers/:id', (req, res, next) => {
  Boxers.update(
    { _id: req.params.id },
    req.body,
    { upsert: true, setDefaultsOnInsert: true },
    (e, data) => {
      res.json(data);
    });
});

export = router;
