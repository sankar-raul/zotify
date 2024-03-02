const express = require("express");
const app = express();
const path = require("path");

// Serve static files from the "res" directory
app.use(express.static(path.join(__dirname, "res")));

// Route for the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'res', 'index.html'));
});

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'res', '404.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server running at port " + PORT);
});
