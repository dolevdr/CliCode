const axios= require('axios');
const express = require('express');
const NodeGeocoder = require('node-geocoder');

const router = express.Router();

router.get('/:lat/:long', async (req, res, next)=>{
    try{
        const lat =parseFloat(req.params.lat);
        const lon = parseFloat(req.params.long);

        //Use NodeGeometer to get city name
        const geocoder = NodeGeocoder({provider: "openstreetmap"});
        const result = await geocoder.reverse({ lat, lon });

        //Get current weather data
        const now = new Date();
        const index = now.getHours();
        const data_result = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=precipitation&current_weather=true`);

        //Get current hour cell (each cell represnts one hour starting 00:00 AM)
        res.status(200).send({'cur':data_result.data.current_weather, 'pre':data_result.data.hourly.precipitation[index +1], 'location':result[0]});
    }
    catch(err){
        next(err);
    }
});

module.exports = router;