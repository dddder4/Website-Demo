var usrSql = require('../modules/sqlCommand');
var mysql = require('mysql');
var config = require('../modules/dbconfig');
var db = require('../modules/basicConnection');

function addCourse(req, res) {
    var param = req.query || req.params;
    var result = {};
    db.queryArgs(usrSql.addCourse, [param.id, param.course_name], function(err) {
        if(!err) {
            result = {
                code: 200,
                msg: 'success'
            };
        } else {
            result = {
                code: 201,
                msg: 'err: ' + err,
                course_name: param.course_name
            };
        }
        db.doReturn(res, result);
    });
}

function addChapter(req, res) {
    var param = req.query || req.params;
    var result = {};
    db.queryArgs(usrSql.addChapter, [param.id, param.chapter_name, param.course_id], function(err) {
        if(!err) {
            result = {
                code: 200,
                msg: 'success'
            };
        } else {
            result = {
                code: 201,
                msg: 'err: ' + err
            };
        }
        db.doReturn(res, result);
    });
}

function showCourses(req, res) {
    var result = {};
    db.query(usrSql.showCourse, function(err, rows) {
        if(!err) {
            result = {
                code: 200,
                msg: 'success',
                list: rows
            }
        } else {
            result = {
                code: 201,
                msg: 'err: ' + err
            }
        }
        db.doReturn(res, result);
    });
}

function showChapters(req, res) {
    var param = req.query || req.params;
    var result = {};
    db.queryArgs(usrSql.showChapter, [param.course_name], function(err, rows) {
        if(!err) {
            result = {
                code: 200,
                msg: 'success',
                list: rows
            };
        } else {
            result = {
                code: 201,
                msg: 'err: ' + err
            };
        }
        db.doReturn(res, result);
    });
}

function login(req, res) {
    var param = req.query || req.params;
    var result = {};
    db.queryArgs(usrSql.login, [param.name], function(err, rows) {
        if(!err) {
            if (rows.length == 0 || rows[0].password != param.password) {
                result.msg = 'error';
            }else {
                result.msg = 'success';
            }
            result.code = 200;
        } else {
            result = {
                code: 201,
                msg: 'err: ' + err
            };
        }
        db.doReturn(res, result);
    });
}

function register(req, res) {
    var param = req.query || req.params;
    var result = {};
    db.queryArgs(usrSql.register, [param.id, param.name, param.password], function(err) {
        if(!err) {
            result = {
                code: 200,
                msg: 'success'
            };
        } else {
            result = {
                code: 201,
                msg: 'err: ' + err
            };
        }
        db.doReturn(res, result);
    });
}

function introduce(req, res) {
    var result = {};
    var param = req.query || req.params;
    db.queryArgs(usrSql.introduce, [param.course_name], function(err, rows) {
        if(!err) {
            result = {
                code: 200,
                msg: 'success',
                introduce: rows[0].introduce
            };
        } else {
            result = {
                code: 201,
                msg: 'err: ' + err
            }
        }
        db.doReturn(res, result);
    });
}

module.exports = {
    addCourse: addCourse,
    addChapter: addChapter,
    showCourses: showCourses,
    showChapters: showChapters,
    login: login,
    register: register,
    introduce: introduce
}