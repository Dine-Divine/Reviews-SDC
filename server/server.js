
// const cluster = require('cluster');
// const cpuCount = require('os').cpus().length;
// console.log(cpuCount)

// if (cluster.isMaster){
//   for (let i = 0; i < cpuCount; i += 1) {
//     cluster.fork();
//   }
//   cluster.on('exit', function (worker) {
//     console.log('Worker %d died :(', worker.id);
//     cluster.fork();

// });

// } else {

  
  const express = require('express');
  const bodyParser = require('body-parser');
  //const db = require('../database/index.js');
  const cors = require('cors');
  const app = express();
  
  const {pool} = require('../database/dbinfo.js')
  
  app.use(cors());
  
  //***Middleware */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(express.static('./client/dist'));
  
  //MARIADB CRUD
  
  app.get('/reviews', function (req, res) {
    console.log(req.query);
    pool.getConnection()
    .then(conn => {
      conn.query(`SELECT * from Reviews where UUID = ${req.query.uuid}`)
      .then((rows) => {
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
    pool.getConnection()
    .then(conn => {
      conn.query(`INSERT INTO reviews (name, review, avatar, date, rating, UUID) VALUES ("${req.body.name}", "${req.body.review}", "${req.body.avatar}", "${req.body.date}", ${req.body.rating}, ${req.body.uuid})`)
      .then((results) => {
        conn.end();
        res.send(results)
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
    pool.getConnection()
    .then(conn => {
      conn.query(`DELETE from reviews where id = ${req.query.id}`)
      .then((response) => {
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
  pool.getConnection()
  .then(conn => {
    conn.query(`UPDATE reviews SET review = "good now", rating = "5" where id = ${req.query.id}`)
    .then((rows) => {
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
    //console.log(cluster.worker.id, `: listening on port ${port}`);
  });
  
//}
  // MONGODB CRUD
  
  // app.get('/reviews', function (req, res) {
//   Reviews.find({' uuid' : req.query.uuid}, (err, docs) => {
//     if (err) {
//       console.log('error', err);
//       res.send(err);
//     } else {
//       res.send(docs);
//     };
//   })
// });

// app.post('/reviews', function (req, res) {
//   const entry = new Reviews ({
//     avatar: req.body.avatar,
//     ' name': req.body.name,
//     ' review': req.body.review,
//     ' date': req.body.date,
//     ' rating': req.body.rating,
//     ' uuid': req.body.uuid
//   })
//   entry.save((err, entry) => {
//     if (err) {
//       console.log('error');
//       res.send(err);
//     } else {
//       res.send(entry);
//     }
//   })
// });

// app.delete('/reviews', function (req, res) {
//   console.log(req.query);
//   Reviews.deleteOne({_id : req.query.id}, (err, response) => {
//     if (err) {
//       console.log('error')
//       res.send(err);
//     } else {
//       res.send(response)
//     }
//   })
// });


// app.put('/reviews', function (req, res) {
//   // const field = req.query.field;
//   // const change = req.query.change;
//   Reviews.updateOne({_id: req.query.id}, {' review': "good now", ' rating': 5}, (err, response) => {
//     if (err) {
//       console.log('error', err);
//       res.send(err);
//     } else {
//       res.send(response);
//     }
//   });
// });
        