// Initialize mongoose
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: null
    }
});

var Organization = (module.exports = mongoose.model('organizations', OrganizationSchema));
module.exports.get = function(callback, limit) {
    Organization.find(callback).limit(limit);
};