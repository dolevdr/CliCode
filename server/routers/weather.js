const axios= require('axios');
const express = require('express');

const router = express.Router();

router.get('/:lat/:long', async (req, res, next)=>{
    try{
        const lat =parseFloat(req.params.lat);
        const long = parseFloat(req.params.long);
        const data_result = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=precipitation&current_weather=true`);
        res.status(200).send({'cur':data_result.data.current_weather, 'pre':data_result.data.hourly.precipitation});
        // res.status(200).send(data_result);
    }
    catch(err){
        next(err);
    }
});

module.exports = router;