const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

const port = process.env.PORT || 5000;
const ip = process.env.IP || '192.168.0.217';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/any',
            'name': '정유성',
            'birthday': '980213',
            'gender': '남성',
            'job': '개발자'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'birthday': '920213',
            'gender': '남성',
            'job': '의적'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/2',
            'name': '이순신',
            'birthday': '870213',
            'gender': '남성',
            'job': '장군'
        },
    ])
})

app.listen(port, () => console.log(`listening on port ${port}`));