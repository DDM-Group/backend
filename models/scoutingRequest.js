const mongoose = require('mongoose');
const scoutingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    level: {
        type: Number
    },
    requestBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const ScoutingRequest = mongoose.model('ScoutingRequest', scoutingSchema);
module.exports = ScoutingRequest;
