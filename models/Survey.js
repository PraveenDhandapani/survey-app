const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecpientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecpientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    __belongsTo: { type: Schema.Types.ObjectId, ref: 'User' },
    sentDate: Date,
    receivedDate: Date
});

mongoose.model('surveys', surveySchema);