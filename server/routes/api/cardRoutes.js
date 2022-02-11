const router = require('express').Router();
const { Card, User } = require('../../models');
const { authMiddleware } = require('../../utils/auth');

// Return all cards
router.get('/', (req, res) => {
    Card.find({})
        .then(cardData => res.json(cardData))
        .catch(err => res.json(err));
});

// Return card based on id
router.get('/:id', ({ params }, res) => {
    Card.findOne({ _id: params.id })
        .then(cardData => {
            if (!cardData) {
                res.status(404).json({ message: 'No card with that id.' });
                return;
            }

            res.json(cardData);
        })
        .catch(err => res.json(err));
});

// Return all cards in the given topic(s)
router.get('/topics/:topic', ({ params, user }, res) => {
    Card.find({ topics: params.topic })
        .then(cardData => res.json(cardData))
        .catch(err => res.json(err));
    User.findOneAndUpdate({ _id: user._id })
})

// Create a card
router.post('/', authMiddleware, ({ body, user }, res) => {
    Card.create(body)
        .then(async cardData => {
            await User.findOneAndUpdate({ _id: user._id }, { $addToSet: { cards: cardData } }, { new: true })
                .catch(err => res.json(err));

            res.json({
                message: `Successfully created card and added to ${user.firstName} ${user.lastName}'s collection.`,
                cardData
            });
        })
        .catch(err => res.json(err));

});

// Update a card based on id
router.put('/:id', ({ params, body }, res) => {
    Card.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(cardData => {
            if (!cardData) {
                res.status(404).json({ message: 'No card with that id.' });
                return;
            }

            res.json({
                message: 'Successfully Updated card.',
                cardData
            });
        })
        .catch(err => res.json(err));
});

// Delete a card based on id
router.delete('/:id', ({ params, body }, res) => {
    Card.findOneAndDelete({ _id: params.id }, { new: true })
        .then(cardData => {
            if (!cardData) {
                res.status(404).json({ message: 'No card with that id.' });
                return;
            }

            res.json({
                message: 'Successfully Deleted card.',
                cardData
            });
        })
        .catch(err => res.json(err));
});

module.exports = router;