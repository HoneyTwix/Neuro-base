const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const path = require("path")
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./user-interface/build")))
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./user-interface/build/index.html"))
})

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});