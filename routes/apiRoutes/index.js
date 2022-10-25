const express = require('express');
const router = express.Router();

router.use(require('./anova_sf1Routes'));
router.use(require('./sessionRoutes'));
router.use(require('./filenameRoutes'));
module.exports = router;