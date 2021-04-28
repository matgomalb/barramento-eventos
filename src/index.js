const express = require('express');
//para enviar eventos para os demais microsserviços
const axios = require('axios');
const app = express();
app.use(express.json());
app.post("/eventos", async (req, res) => {
    const evento = req.body;
    //envia o evento para o microsserviço de Cadastro-Cliente
    axios.post("http://localhost:4000/clientes", evento);
    //envia o evento para o microsserviço de Ingressos
    axios.post("http://localhost:5000/clientes/:id/ingressos", evento);
    //envia o evento para o microsserviço de Consultas
    axios.post("http://localhost:6000/consulta", evento);
    res.status(200).send({
        msg: "ok"
    });
});
app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000.')
})