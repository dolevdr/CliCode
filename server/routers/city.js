const app = require('express');
const NodeGeocoder = require('node-geocoder');

const router = app.Router();

router.get('/:lat/:long', async (req, res, next)=>{
    try{
        const lat =parseFloat(req.params.lat);
        const long = parseFloat(req.params.long);
        const options = {
            provider: "openstreetmap",
          };
        const geocoder = NodeGeocoder(options);
        const result = await geocoder.reverse({ lat: lat, lon: long });
        res.status(200).send(result);
    }
    catch(err){
        next(err);
    }
});

module.exports = router;