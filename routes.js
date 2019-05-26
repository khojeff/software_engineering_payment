// Import express
let express = require('express');

// Initialize express router
let router = express.Router();

// Import controllers 
// const comments = require('./controllers/comment');
// const members = require('./controllers/member');
const orgs = require('./controllers/organization');

// Set router
router.use('/orgs', orgs);
// router.use('/:orgs/comments', comments);
// router.use('/members', members);

// Export Routes
module.exports = router;