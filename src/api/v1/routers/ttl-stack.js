const express = require('express');
const moment = require('moment');
const router = express.Router();
const ItemRepository = require('../repositories/ttl-stack/ItemRepository');
const ItemEntity = require('../entities/ttl-stack/ItemEntity');

const itemRepository = new ItemRepository();

router.post('/item', ({body}, res) => {
    const validated = itemRepository.validate(body);
    if (validated.error) {
        return res.status(422).json({error: validated.error.message});
    }
    const itemEntity = new ItemEntity(body);
    if (!itemRepository.persist(itemEntity)) {
        return res.status(500).json({error: "The item was failed"});
    }

    return res.json(itemEntity);
});

router.get('/item/:key', (req, res) => {
    const {key} = req.params;

    res.json(itemRepository.findItemConsiderTTl({
        item: itemRepository.findByKey(key),
        currentTime: moment().unix()
    }));
});

router.delete('/item/:key', (req, res) => {
    const {key} = req.params;
    const item = itemRepository.findByKey(key);
    if (!item.key) {
        return res.status(404).json({error: "Such item wasn't found."});
    }
    itemRepository.remove(item);
    res.json(item);
});

router.get('/items', (req, res) => {
    res.json(itemRepository.findAll());
});

module.exports = router;
