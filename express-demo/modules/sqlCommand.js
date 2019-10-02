var usr_sql = {
    addCourse: 'insert into Course (id, course_name) values (?, ?)',
    showCourse: 'select * from Course',
    addChapter: 'insert into Chapter (id, chapter_name, course_id) values (?, ?, ?)',
    showChapter: 'select * from Chapter where course_id = ?',
    login: 'select password from User where name = ?',
    register: 'insert into User (id, name, password) values (?, ?, ?)',
    introduce: 'select introduce from Course where course_name = ?'
}

module.exports = usr_sql