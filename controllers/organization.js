// Initialize express
const express = require('express');

// Initialize router
const router = express.Router();

// Initialize body parser
const bodyParser = require('body-parser');

// Initialize mongoose
var mongoose = require('mongoose');

// Load model
var Organization = require('../models/organizationModel');
var Comment = require('../models/commentModel');
var Member = require('../models/memberModel');

// Use body parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// #1 
// Add comment
router.post('/:org/comments', (req, res) => {
    let query = {}
    // check if comment exist
    if(req.body.comment) {
        // check if org exist
        if(req.params.org) {
            // set query
            query.name = req.params.org;
            // find org 
            Organization.find(query)
            .then(data => {
                if (!data || data.length == 0) {
                    res.status(400).send('Failed fetch Organization data');
                } else {
                    // construct save data
                    var comment = new Comment({
                        organizationId: data[0]._id,
                        comment: req.body.comment
                    });
                    // save comment
                    comment.save(function(err) {
                        if(err) {
                            res.status(400).send(err)
                        } else {
                            res.json({
                                message: 'Comment update added for ' + data[0].name,
                                data: comment
                            });
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            res.status(400).send('Organization is required.');
        }
    } else {
        res.status(400).send('Comment update required.')
    }
});

// #2
// Get all comment from organization
router.get('/:org/comments', (req, res) => {
    let query = {};
    if(req.params.org) {
        query.name = req.params.org;

        Organization.find(query)
        .then(data => {
            if (!data) {
                res.status(400).send('Failed fetch Organization data');
            } else {
                Comment.find({
                    organizationId: { $in: data.map(r => new mongoose.Types.ObjectId(r._id)) },
                    isDeleted: false
                })
                .populate('organizationId','_id name isDeleted')
                .sort({createdDate: 'DESC'})
                .then(data2 => {
                    if(data2.length == 0) {
                        res.json({
                            message: 'No active comments from ' + data[0].name,
                            data: data2
                        });
                    } else {
                        res.json({
                            message: 'Successfully get comments from ' + data[0].name,
                            data: data2
                        });
                    }
                })
                .catch(err => {
                    console.log(err);        
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

    } else {
        res.status(400).send('Organization is required.')
    }
});

// #3
// Delete all comment from organization
router.put('/:org/comments', (req, res) => {
    let query = {};
    if(req.params.org) {
        query.name = req.params.org;
        Organization.find(query)
        .then(data => {
            if (!data) {
                res.status(400).send('Failed fetch Organization data');
            } else {
                Comment.updateMany(
                    { organizationId: data[0]._id },
                    { isDeleted: true },
                    { multi: true}
                )
                .then(data => {
                    if(!data) {
                        res.status(400).send('Failed to update data');
                    } else {
                        res.send('Data successfully update.');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        })
        .catch(err => {
            console.log(err);
        });

    } else {
        res.status(400).send('Organization is required.')
    }
});

// #4
// Get all member from organization
router.get('/:org/members', (req, res) => {
    let query = {};
    if(req.params.org) {
        query.name = req.params.org;

        Organization.find(query)
        .then(data => {
            if (!data) {
                res.status(400).send('Failed fetch Organization data');
            } else {
                Member.find({
                    organizationId: { $in: data.map(r => new mongoose.Types.ObjectId(r._id)) },
                    isDeleted: false
                })
                .select('-updatedDate')
                .populate('organizationId','_id name isDeleted')
                .sort({totalFollower: 'DESC'})
                .then(data2 => {
                    if(data2.length == 0) {
                        res.json({
                            message: 'No members from ' + data[0].name,
                            data: data2
                        });
                    } else {
                        res.json({
                            message: 'Successfully get members from ' + data[0].name,
                            data: data2
                        });
                    }
                })
                .catch(err => {
                    console.log(err);        
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

    } else {
        res.status(400).send('Organization is required.')
    }
});

// #1 
// Add member
router.post('/:org/members', (req, res) => {
    let query = {}
    // check if comment exist
    if(req.body.organizationId) {
        // check if org exist
        if(req.body.name) {
            // set query
            query._id = req.body.organizationId;
            // find org 
            Organization.find(query)
            .then(data => {
                if (!data || data.length == 0) {
                    res.status(400).send('Failed fetch Organization data');
                } else {
                    // construct save data
                    var member = new Member({
                        organizationId: req.body.organizationId,
                        name: req.body.name,
                        totalFollower: req.body.totalFollower,
                        totalFollowing: req.body.totalFollowing
                    });
                    // save comment
                    member.save(function(err) {
                        if(err) {
                            res.status(400).send(err)
                        } else {
                            res.json({
                                message: 'Successfully add Member for ' + data[0].name,
                                data: member
                            });
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            res.status(400).send('Name is required.');
        }
    } else {
        res.status(400).send('Organization is required.')
    }
});

module.exports = router;
