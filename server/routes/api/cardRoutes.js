const router = require('express').Router();
const { Card } = require('../../models');

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

// Create a card
router.post('/', ({ body }, res) => {
    Card.create(body)
        .then(cardData => res.json(cardData))
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