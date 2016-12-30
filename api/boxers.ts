import * as express from 'express';
import Boxer from './../models/boxer';
let router = express.Router();

router.get('/boxers', (req, res, next) => {
  res.json({});
});
