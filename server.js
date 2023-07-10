require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const ANWB_API_KEY = process.env.ANWB_API_KEY
const ANWB_API_INCIDENT_URL = process.env.ANWB_API_INCIDENT_URL
const PORT = (process.env.PORT ? process.env.PORT : 3000) // PORT will default to 3000 if no PORT is provided by environment variables

const options = {
    method: 'GET',
    headers: {
        polylines: 'true',
        polylineBounds: 'true',
        total: 'true',
        'x-anwb-client-id': ANWB_API_KEY
    }
};

app.get('/incidents', async function (req, res) {
    let data;
    const incidentRes = await fetch(ANWB_API_INCIDENT_URL, options)
    data = await incidentRes.json()
    res.send(data);
})

app.get('/maps', async function (req, res) {
    const googleMap = await google.maps.importLibrary("maps");
    console.log(googleMap)
    res.send(googleMap);
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})