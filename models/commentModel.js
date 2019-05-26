// Initialize mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

var CommentSchema = new mongoose.Schema({
    organizationId: {
        type: Schema.ObjectId,
        ref: 'organizations',
        required: true
    },
    comment: {
        type: String
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

var Comment = (module.exports = mongoose.model('comments', CommentSchema));
module.exports.get = function(callback, limit) {
    Comment.find(callback).limit(limit);
};