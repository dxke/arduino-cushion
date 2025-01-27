const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const arduinoIp = "http://<arduino-ip-address>";  //replace with our ip later

app.use(bodyParser.json());

const postToArduino = async (endpoint, req, res) => {
    try {
        const response = await axios.post(`${arduinoIp}${endpoint}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send("Error communicating with Arduino");
    }
};

app.post("/button-press", (req, res) => postToArduino("/button-press", req, res));
app.post("/inflate", (req, res) => postToArduino("/inflate", req, res));
app.post("/deflate", (req, res) => postToArduino("/deflate", req, res));
app.post("/start-session", (req, res) => postToArduino("/start-session", req, res));
app.post("/pause-session", (req, res) => postToArduino("/pause-session", req, res));

app.post("/pressure-data", (req, res) => {
    try {
        // Handle the pressure data sent from Arduino
        console.log("Pressure data received:", req.body);
        res.status(200).send("Pressure data received");
    } catch (error) {
        res.status(500).send("Error processing pressure data");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
