const express = require("express")
const app = express()

app.get("/api/v1/tasks", (req, res)=>{
    res.send("Hi")
})

app.listen(3000, ()=>{
    console.log("Server started...")
})