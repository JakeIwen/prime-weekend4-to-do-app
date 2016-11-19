var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/to_do';



router.put('/completed/:id', function(req, res) {
  taskId = req.params.id;
  console.log('flipping id:', taskId);
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'UPDATE tasks SET completed=NOT completed' +  ' WHERE id=$1',
      [taskId],
      function(err, result) {
        done();
        if (err) {
          console.log('updatequery error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    });
  });

  router.post('/', function(req, res) {

    var task = req.body;
    console.log('posting task:', task.newTask);
    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        console.log('connection error: ', err);
        res.sendStatus(500);
      }
      client.query(
        'INSERT INTO tasks (task)' +
        'VALUES ($1)', [task.newTask],
        function(err, result) {
          done();
          if (err) {
            console.log('insert query error: ', err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
      });
    });

    router.delete('/delete/:id', function(req, res) {
      deleteId = req.params.id;
      console.log('deleting id:', deleteId);
      pg.connect(connectionString, function(err, client, done) {
        if (err) {
          console.log('connection error: ', err);
          res.sendStatus(500);
        }
        client.query(
          'DELETE FROM tasks ' +  ' WHERE id=$1',
          [deleteId],
          function(err, result) {
            done();
            if (err) {
              console.log('deletequery error: ', err);
              res.sendStatus(500);
            } else {
              res.sendStatus(201);
            }
          });
        });
      });

    router.get('/', function(req, res) {
      console.log('get tasks');
      pg.connect(connectionString, function(err, client, done) {
        if(err) {
          console.log('connection error - gettasks: ', err);
          res.sendStatus(500);
        }
        client.query('SELECT * FROM tasks', function(err, result) {
          done(); // close the connection.
          if(err) {
            console.log('select query error - gettasks ', err);
            res.sendStatus(500);
          }
          res.send(result.rows);
        });
      });
    });
    module.exports = router;
