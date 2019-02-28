const express = require('express');
const router = express.Router();
const ItemRepository = require('../repositories/stack/ItemRepository');
const ItemEntity = require('../entities/stack/ItemEntity');
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

router.get('/item/take/last', (req, res) => {
    res.json(itemRepository.takeOutLastItem());
});

router.get('/items', (req, res) => {
    res.json(itemRepository.findAll());
});

module.exports = router;
