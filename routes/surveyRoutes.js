const mongoose = require('mongoose');
const authGuard = require('../middleware/authGuard');
const creditGuard = require('../middleware/creditGuard');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/survey/completed', (req, res) => {
        res.send('Your response has registered with us. Thanks for your feedback');
    });

    app.post('/api/survey', authGuard, creditGuard, async (req, res) => {

        const { title, body, subject, recipients } = req.body;
        const survey = new Survey({
            //ES6 title : title same as title
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email => { return { email: email.trim() } }), // trim to eliminate the white space
            _belongsTo: req.user.id,
            sentDate: Date.now()
        });

        console.log("receipients >>" + recipients);

        console.log("survey Obj >>" + survey.recipients);

        //creating Mailer object with survey details and template mail
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }

    });

};