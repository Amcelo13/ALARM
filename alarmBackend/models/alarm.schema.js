const mongoose = require('mongoose');
const alarmSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true,
    },
    userInfo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
    
})
module.exports = mongoose.model('alarm', alarmSchema);