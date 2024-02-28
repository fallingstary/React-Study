const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');
const multer = require('multer');

const app = express();

const port = process.env.PORT || 5000;
const ip = process.env.IP || 'localhost';

const db = mysql.createConnection({
    host: process.env.IP,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME
});
db.connect();

const upload = multer({ dest: './upload' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    db.query('select * from customer where isDeleted = 0', (err, results) => {
        if (err) throw err;
        res.json(results);
    })
})

app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
    let addSql = 'insert into customer values (null, ?, ?, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.userName;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    db.query(addSql, params,
        (err, rows, field) => {
            res.send(rows);
        });
})
app.delete('/api/customers/:id', (req, res) => {
    let deleteSql = 'update customer set isDeleted = 1 where id = ?';
    let params = [req.params.id];
    db.query(deleteSql, params, (err, rows, field) => {
        res.send(rows);
    })
})

app.listen(port, () => console.log(`listening on port ${port}`));