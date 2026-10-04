


const express = require("express")

const app = express()

const imageRouter = require("./routes/imageHandler")
const path = require("path")


app.use("/mages", express.static(path.join(__dirname, "/uploads/processed")))
app.use("/api/", imageRouter)














app.listen(5001, () =>{
    console.log("http://localhost:5001")
})