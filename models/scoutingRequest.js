const mongoose = require('mongoose');
const scoutingSchema = new mongoose.Schema({
    name: String,
    level: Number,
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    requestObject: String,
    place: String,
    task: String,
    dueDate: Date,
    startDate: Date
});
const ScoutingRequest = mongoose.model('ScoutingRequest', scoutingSchema);
module.exports = ScoutingRequest;
