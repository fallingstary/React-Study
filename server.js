const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    db.query('SELECT * FROM CUSTOMER', (err, results) => {
        if (err) throw err;
        res.json(results);
    })
})

app.listen(port, () => console.log(`listening on port ${port}`));