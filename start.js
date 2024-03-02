const express = require("express")
const app = express()
app.use(express.static(__dirname));
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(8080, () => {
    console.log("server running at the port no 8080");
});