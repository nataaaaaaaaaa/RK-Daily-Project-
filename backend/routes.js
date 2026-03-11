const express = require("express")
const router = express.Router()

const db = require("./db")

/*
================================
CEK DATABASE TERHUBUNG
================================
*/
router.get("/cekdb",(req,res)=>{

db.query("SELECT DATABASE() as database_name",(err,result)=>{

if(err){
console.log(err)
res.send("Error database")
return
}

res.json(result)

})

})


/*
================================
AMBIL SEMUA DATA ALUMNI
================================
*/
router.get("/alumni",(req,res)=>{

const sql = "SELECT * FROM alumni"

db.query(sql,(err,result)=>{

if(err){
console.log(err)
res.send("Error mengambil data alumni")
return
}

res.json(result)

})

})


/*
================================
TAMBAH DATA ALUMNI
================================
*/
router.post("/alumni",(req,res)=>{

const {nama, prodi, tahun, kota} = req.body

const sql = `
INSERT INTO alumni (nama, prodi, tahun_lulus, kota)
VALUES (?,?,?,?)
`

db.query(sql,[nama,prodi,tahun,kota],(err,result)=>{

if(err){
console.log(err)
res.send("Gagal menambahkan alumni")
return
}

res.json({
message:"Alumni berhasil ditambahkan"
})

})

})


/*
================================
JALANKAN PELACAKAN ALUMNI
================================
*/
router.get("/pelacakan",(req,res)=>{

const sql = "SELECT * FROM alumni"

db.query(sql,(err,data)=>{

if(err){
console.log(err)
res.send("Error pelacakan")
return
}

data.forEach(alumni=>{

let status
let random = Math.random()

if(random > 0.6){
status = "Teridentifikasi dari sumber publik"
}
else if(random > 0.3){
status = "Perlu Verifikasi Manual"
}
else{
status = "Belum ditemukan di sumber publik"
}

const updateQuery = `
UPDATE alumni
SET status = ?
WHERE id = ?
`

db.query(updateQuery,[status,alumni.id])

})

res.json({
message:"Pelacakan selesai"
})

})

})


module.exports = router