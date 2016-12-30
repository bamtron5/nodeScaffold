import * as express from 'express';
import Boxers from './../models/Boxers';
let router = express.Router();

router.get('/boxers', (req, res, next) => {
  Boxers.find().then((data) => {
    res.json(data);
  });
});

export = router;
