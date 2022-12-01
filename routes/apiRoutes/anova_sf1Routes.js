const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all anova_sf1 ordered by filename
router.get('/anova_sf1', (req, res) => {
  const sql = `SELECT * FROM anova_sf1 ORDER BY Filename`;

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
router.get('/anova_sf1/:filename', (req, res) => {
  const sql = `SELECT * FROM anova_sf1 WHERE Filename = ?`;
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
    db.destroy()
  });
});

// Create an anova_sf1 row
router.post('/anova_sf1', ({ body }, res) => {
  const errors = inputCheck(body, 'Filename','Neuron', 'Anova1Cue', 'Anova1Delay','Anova1Sample','Anova1Delay2','Anova1Match','Anova1MatchDelay');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO anova_sf1 (Filename, Neuron, Anova1Cue, Anova1Delay,Anova1Sample,Anova1Delay2,Anova1Match,Anova1MatchDelay) VALUES (?,?,?,?,?,?,?,?)`;
  const params = [body.Filename,body.Neuron, body.Anova1Cue, body.Anova1Delay,body.Anova1Sample,body.Anova1Delay2,body.Anova1Match,body.Anova1MatchDelay];

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
  db.destroy()
});

// Update an anova_sf1 neuron
router.put('/anova_sf1/:filename', (req, res) => {
  const errors = inputCheck(req.body, 'Neuron');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE anova_sf1 SET Neuron = ? WHERE filename = ?`;
  const params = [req.body.Neuron, req.params.filename];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'neuron not found'
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
router.delete('/anova_sf1/:id', (req, res) => {
  const sql = `DELETE FROM anova_sf1 WHERE id = ?`;

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

