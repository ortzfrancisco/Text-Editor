const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Routes
const htmlRoutes = require('./routes/htmlRoutes');
app.use('/',htmlRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
