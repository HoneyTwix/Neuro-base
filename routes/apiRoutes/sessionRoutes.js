const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all anova_sf1 ordered by filename
router.get('/session', (req, res) => {
  const sql = `SELECT * FROM session ORDER BY Date`;

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
router.get('/session/:date', (req, res) => {
  const sql = `SELECT * FROM session WHERE date = ?`;
  const params = [req.params.date];

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
router.post('/session', ({ body }, res) => {
  const errors = inputCheck(body, 'Monkey','Hemisphere', 'Training', 'Date','Recording_Day','Electrode','Channel','AnteriorPosterior','LateralMedial','Area','setZero','advanceDepth','totalDepth');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO session (Monkey,Hemisphere, Training,Date,Recording_Day,Electrode,Channel,AnteriorPosterior,LateralMedial,Area,setZero,advanceDepth,totalDepth) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const params = [body.Monkey,body.Hemisphere, body.Training, body.Date,body.Recording_Day,body.Electrode,body.Channel,body.AnteriorPosterior,body.LateralMedial,body.Area,body.setZero,body.advanceDepth,body.totalDepth];

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

// Update an anova_sf1 neuron
router.put('/session/:id', (req, res) => {
  const errors = inputCheck(req.body, 'Area');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE session SET Area = ? WHERE id = ?`;
  const params = [req.body.Neuron, req.params.filename];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'area not found'
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
router.delete('/session/:id', (req, res) => {
  const sql = `DELETE FROM session WHERE id = ?`;

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

