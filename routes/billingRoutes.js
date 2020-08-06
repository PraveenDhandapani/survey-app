const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const authGuard = require('../middleware/authGuard');

module.exports = (app) => {

    app.post('/api/stripe', authGuard, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'inr',
            description: 'recharging for e-survey app credit', 
            source: req.body.id,
            // As per Indian regulations, name and address is essentials for successful transaction if the currency != INR
      }).catch(err => {
          console.log(err);
      });
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });

};