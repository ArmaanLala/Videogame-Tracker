const express = require('express');

const router = express.Router();

router.get('/:gameId', async(req,res) => {
    const fetch = require ('node-fetch');
    try{
    const id = req.params.gameId;
    const resp = await fetch(`https://api.thegamesdb.net/v1/Games/Images?apikey=TMP_TEST_KEY&games_id=${req.params.gameId}`)
    const data = await resp.json();
    const url = data.data.base_url.original + data.data.images[id][0].filename
    return res.status(200).json(url);
    }
    catch(err){
        return res.status(400).json(err);
    }
})

module.exports = router;