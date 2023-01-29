const axios= require('axios');
const express = require('express');
const NodeGeocoder = require('node-geocoder');

const router = express.Router();

router.get('/:lat/:long', async (req, res, next)=>{
    try{
        const lat =parseFloat(req.params.lat);
        const long = parseFloat(req.params.long);

        //Use NodeGeometer to get city name
        const geocoder = NodeGeocoder({provider: "openstreetmap"});
        const result = await geocoder.reverse({ lat: lat, lon: long });

        //Get weather from the api (need only 24 hours of precipitation data)
        const data_result = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=precipitation&current_weather=true`);
        res.status(200).send({'cur':data_result.data.current_weather, 'pre':data_result.data.hourly.precipitation.splice(0,24), 'city':result[0]});
    }
    catch(err){
        next(err);
    }
});

module.exports = router;