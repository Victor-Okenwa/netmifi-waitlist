const express = require('express');
const { waitlist, waitlistCount } = require('../controllers/waitlistController');
const router = express.Router();

router.get('/count', waitlistCount);
router.post('/', waitlist);

module.exports = router;
