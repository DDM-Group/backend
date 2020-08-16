const mongoose = require('mongoose');
const scoutingSchema = new mongoose.Schema({
    name: String,
    level: Number,
    isVisible: Boolean,
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const ScoutingRequest = mongoose.model('ScoutingRequest', scoutingSchema);
module.exports = ScoutingRequest;
