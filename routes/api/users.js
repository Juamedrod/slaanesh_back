const router = require('express').Router();
const User = require('../../models/user.model');

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ error: 'Authentication error, credentials are not correct' });
        if (req.body.password == user.password) {
            return res.json(user);
        } else {
            return res.status(401).json({ error: 'Authentication error, credentials are not correct' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});



module.exports = router;