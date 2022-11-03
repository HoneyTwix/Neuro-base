const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all anova_sf1 ordered by filename
router.get('/filename', (req, res) => {
  const sql = `SELECT * FROM filename ORDER BY Filename`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get data on an anova_sf1 row based on filename
router.get('/filename/:filename', (req, res) => {
  const sql = `SELECT * FROM filename WHERE Filename = ?`;
  const params = [req.params.filename];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Create an anova_sf1 row
router.post('/filename', ({ body }, res) => {
  const errors = inputCheck(body, 'Filename','RecordingDay', 'Date', 'Monkey','Task','TechnicalNotes','Comment');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO filename (Filename, RecordingDay, Date, Monkey,Task,TechnicalNotes,Comment) VALUES (?,?,?,?,?,?,?)`;
  const params = [body.Filename,body.RecordingDay, body.Date, body.Monkey,body.Task,body.TechnicalNotes,body.Comment];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Update a filename monkey
router.put('/filename/:filename', (req, res) => {
  const errors = inputCheck(req.body, 'Monkey');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE filename SET Monkey = ? WHERE filename = ?`;
  const params = [req.body.Monkey, req.params.filename];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'monkey not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Delete an anova_sf1 row
router.delete('/filename/:id', (req, res) => {
  const sql = `DELETE FROM filename WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'File not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

module.exports = router;

