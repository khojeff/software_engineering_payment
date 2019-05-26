// Initialize mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

var MemberSchema = new mongoose.Schema({
    organizationId: {
        type: Schema.ObjectId,
        ref: 'organizations',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null
    },
    totalFollower: {
        type: Number,
        default: 0
    },
    totalFollowing: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Number,
        default: 0
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

var Member = (module.exports = mongoose.model('members', MemberSchema));
module.exports.get = function(callback, limit) {
    Member.find(callback).limit(limit);
};