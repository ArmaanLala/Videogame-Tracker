const express = require('express');

const router = express.Router();

router.get('/:console/:name', async(req,res) => {
    const fetch = require ('node-fetch');
    try {
    const name = req.params.name.replace(/\s/g, '%20');
    const resp = await fetch(`https://api.thegamesdb.net/v1.1/Games/ByGameName?apikey=TMP_TEST_KEY&name=${name}&filter%5Bplatform%5D=${req.params.console}`)
    const data = await resp.json();
    // return res.status(200).json(data);
    return res.status(200).json(data.data.games[0].id);
    }
    catch(err) {
        return res.status(400).json(err);
    }
})

module.exports = router;