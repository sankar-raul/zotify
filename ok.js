const express = require("express")
const app = express()
const path = require("path")
app.use(express.static(path.join(__dirname,"res")))
/*app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname,'res/404.html'));
});*/
 app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8080, () => {
    console.log("server running at the port no 8080")
})
