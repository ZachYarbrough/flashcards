const router = require('express').Router();
const { User } = require('../../models');
const { signToken } = require('../../utils/auth');

// Return all users
router.get('/', (req, res) => {
    User.find({})
        .then(cardData => res.json(cardData))
        .catch(err => res.json(err));
});

// Return user based on id
router.get('/:id', ({ params }, res) => {
    User.findOne({ _id: params.id })
        .populate('cards')
        .then(cardData => {
            if (!cardData) {
                res.status(404).json({ message: 'No user with that id.' });
                return;
            }

            res.json(cardData);
        })
        .catch(err => res.json(err));
});

// Update a user based on id
router.put('/:id', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
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

// Delete a user based on id
router.delete('/:id', ({ params, body }, res) => {
    User.findOneAndDelete({ _id: params.id }, { new: true })
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

// Creates a user and login token
router.post('/register', async ({ body }, res) => {
    const user = await User.create(body)
        .catch(err => res.json(err));

    const token = signToken(user);

    res.json({
        token,
        user
    })
});

// Logs a user into the application
router.post('/login', async ({ body }, res) => {
    const user = await User.findOne({ email: body.email })
        .catch(err => res.json(err));

    if (!user) {
        res.status(404).json({ message: 'Incorrect email.', test: [body.email, body.password] });
        return;
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
        res.status(404).json({ message: 'Incorrect password.' });
        return;
    }

    const token = signToken(user);

    res.json({
        token,
        user
    })
});

module.exports = router;