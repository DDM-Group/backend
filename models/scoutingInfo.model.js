const mongoose = require('mongoose');
const scoutingSchema = new mongoose.Schema({
    name: String,
    level: Number,
    data: Object,
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const ScoutingInfo = mongoose.model('ScoutingInfo', scoutingSchema);
module.exports = ScoutingInfo;