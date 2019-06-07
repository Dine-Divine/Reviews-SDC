const express = require('express');
const bodyParser = require('body-parser');
//const db = require('../database/index.js');
const cors = require('cors');
const app = express();

const db = require('../database/dbinfo.js')

app.use(cors());

//***Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/reviews', function (req, res) {
    console.log(req.query);
    let id = req.query.uuid;
    db.pool.getConnection()
        .then(conn => {
            conn.query(`SELECT * from reviews where uuid = ${id}`)
            .then((rows) => {
                console.log(rows);
                res.send(rows);
                conn.end();
            })
            .catch(err => {
                console.log('error', err);
                conn.end();
            })
        })
        .catch(err => {
            console.log('error', err);
        })
});

app.post('/reviews', function (req, res) {
    console.log(req.body)
    db.pool.getConnection()
    .then(conn => {
      conn.query(`INSERT INTO reviews (name, review, avatar, date, rating, UUID) VALUES ("${req.body.name}", "${req.body.review}", "${req.body.avatar}", "${req.body.date}", ${req.body.rating}, ${req.body.UUID})`)
        .then((res) => {
          console.log(res);
          conn.end();
          res.end()
        })
        .catch(err => {
          console.log('error', err);
          conn.end();
          res.end();
        })
    })
    .catch(err => {
      console.log('error', err);
    })
});

app.delete('/reviews', function (req, res) {
    console.log(req.query);
    const id = req.query.id
    db.pool.getConnection()
    .then(conn => {
      conn.query(`DELETE from reviews where id = ${id}`)
        .then((res) => {
          console.log(res);
          conn.end();
          res.end();
        })
        .catch((err) => {
          console.log('error', err);
          conn.end();
          res.end();
        })
    })
    .catch((err) => {
      console.log('error', err);
    })
});


app.put('/reviews', function (req, res) {
    console.log(req.query);
    const id = req.query.id;
    db.pool.getConnection()
    .then(conn => {
      conn.query(`UPDATE reviews SET name="hunter" where id = ${id}`)
        .then((rows) => {
          console.log(rows);
          conn.end();
          res.end();
        })
        .catch(err => {
          console.log('error', err);
          conn.end();
          res.end();
        })
    })
    .catch(err => {
      console.log('error', err);
    })
    res.end();
});
        
let port = 3004;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});