const _ = require('lodash');
const mongoose = require('mongoose');
const authGuard = require('../middleware/authGuard');
const creditGuard = require('../middleware/creditGuard');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate');

const { URL } = require('url');
const { Path } = require('path-parser');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys', authGuard, async (req, res) => {
        // console.log(req.user.id);

        const surveys = await Survey.find({ title: 'hi' })
                                   .select({ recipients: false});

       // console.log(surveys);
        res.send(surveys);
    });

    app.get('/api/survey/:surveyId/:choice', (req, res) => {
        res.send('Your response has registered with us. Thanks for your feedback');
    });

    app.post('/api/survey/webhooks', (req, res) => {

         //For Dev ngrok Tunel testing purpose
          console.log(req.body);
        // res.send({ msg: "Integration is working" });
        

         const pathparser = new Path('/api/survey/:surveyId/:choice');
 
         const events =  _.chain(req.body)
             .map(({ url, email }) => {
                 const match = pathparser.test(new URL(url).pathname); // match cannot be refactored to {}, possible null can be expected
                 if (match) {
                     return { email, surveyId: match.surveyId, choice: match.choice };
                 }
             })
             .compact()
             .uniqBy('email', 'surveyId')
                .each(({ email, surveyId, choice }) => {
                  //porcolate the sub document
                  // to identify the column name of choice value (yes /no )
                  //$dentifes the current recpient obj among the recipients
                    Survey.updateOne({
                      _id: surveyId,
                        recipients: {
                          $elemMatch: { email: email, responded: false }  
                      }
                  }, {
                      $inc: { [choice]: 1 }, 
                      $set: { 'recipients.$.responded': true },
                      receivedDate: new Date()
                    }, { upsert: true })
                        .exec()
                        .catch(err => console.log());
             })
            .value();

        console.log(events);
 
         // Webhooks doesn't require any response back
       
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

      
        //creating Mailer object with survey details and template mail
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            const mailSent = await mailer.send();
            console.log(mailSent);
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            console.log(err);
            res.status(422).send(err);
        }

    });

};