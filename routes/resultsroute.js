const express = require('express');
const router = express.Router();
const results = require('../service/resultsService');
const userController =require('../controllers/userController');

/* GET results. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await results.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting  results `, err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
    try {
      res.json(await results.getStudentResult(req.params.id,req.body));
    } catch (err) {
      console.error(`Error while getting  results `, err.message);
      next(err);
    }
  });

router.post('/', async function(req, res, next) {
    try {
      res.json(await results.create(req.body));
    } catch (err) {
      console.error(`Error while capturing results`, err.message);
      next(err);
    }
  });

  router.put('/:id', async function(req, res, next) {
    try {
      res.json(await results.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating  results`, err.message);
      next(err);
    }
  });

  router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await results.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting results`, err.message);
      next(err);
    }
  });
  router.get('/login', userController.login);
router.post('/', userController.find);

module.exports = router;