/**
 *  ROUTE: api/card
 */
const router = require('express').Router();
const Card = require('../../models/card.model');


router.get('/', async (req, res) => {
    try {
        const response = await Card.find();
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const response = await Card.create(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Card.findByIdAndRemove(req.params.id);
        res.json({ result: success });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;