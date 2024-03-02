const express = require("express")
const app = express()
const path = require("path")
app.use(express.static("res"))

 app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname,'404.html'))
})
app.listen(8080, () => {
    console.log("server running at the port no 8080")
})
