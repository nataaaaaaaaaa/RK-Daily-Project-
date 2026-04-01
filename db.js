const mysql = require("mysql2")

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "daily_project_3"
})

db.connect((err)=>{
if(err){
console.log(err)
}else{
console.log("Database terhubung")
}
})

module.exports = db