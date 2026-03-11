const API = "http://localhost:3000"

document.getElementById("alumniForm").addEventListener("submit",async function(e){

e.preventDefault()

let data = {
nama: document.getElementById("nama").value,
prodi: document.getElementById("prodi").value,
tahun: document.getElementById("tahun").value,
kota: document.getElementById("kota").value
}

await fetch(API+"/alumni",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

loadAlumni()

})

async function loadAlumni(){

let res = await fetch(API+"/alumni")
let data = await res.json()

let tabel = document.getElementById("tabelAlumni")
tabel.innerHTML=""

data.forEach(a=>{

tabel.innerHTML += `
<tr>
<td>${a.nama}</td>
<td>${a.prodi}</td>
<td>${a.tahun_lulus}</td>
<td>${a.kota}</td>
<td>${a.status}</td>
</tr>
`

})

}

async function jalankanPelacakan(){

await fetch(API+"/pelacakan")

loadAlumni()

alert("Pelacakan selesai")

}

loadAlumni()