const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "docs")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'docs', '404.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server running at port " + PORT);
});
