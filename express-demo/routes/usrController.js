var express = require('express');
var router = express.Router();
var usrDao = require('../dao/usrDao');

/* GET home page. */
router.post('/addCourse', function(req, res) {
  usrDao.addCourse(req, res);
});

router.post('/addChapter', function(req, res) {
  usrDao.addChapter(req, res);
});

router.get('/showCourses', function(req, res) {
  usrDao.showCourses(req, res);
});

router.get('/showChapters', function(req, res) {
  usrDao.showChapters(req, res);
});

router.get('/login', function(req, res) {
  usrDao.login(req, res);
});

router.post('/register', function(req, res) {
  usrDao.register(req, res);
});

router.get('/introduce', function(req, res) {
  usrDao.introduce(req, res);
})

module.exports = router;
