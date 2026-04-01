const express = require("express")
const cors = require("cors")
const path = require("path")

const routes = require("./routes")

const app = express()

app.use(cors())
app.use(express.json())

// hubungkan frontend
app.use(express.static(path.join(__dirname, "../frontend")))

app.use("/", routes)

app.listen(3000,()=>{
console.log("Server berjalan di http://localhost:3000")
})