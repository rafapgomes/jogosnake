const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const bodyParser = require('body-parser')
const BD = require("./database")
app.use(cors())

app.use(bodyParser.json());


app.get('/',(req, res) => {
  BD.select().then(data=>{
   res.send(data)
  })

})

app.post('/inserir',(req, res) => {
    console.log(req.body.nome)
    BD.inserir(req.body.nome,req.body.pontos)
    res.send("Dados inseridos")
 })
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})