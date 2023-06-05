const express = require('express');
const userController = require('../controllers/userController');
const multer = require('multer')
const path = require('path');
const readExcel = require('../controllers/readExcel');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', '..', 'upload'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = file.originalname
        cb(null, uniqueSuffix);
    }
})
const upload = multer({ storage: storage })
let router = express.Router();

const { readFileExcel } = require('../controllers/readExcel');

let initWebRoutes = (app) => {
    router.post('/api/login', userController.handleLogin);
    router.get('/api/num-bubble-sort-41', userController.authenticateToken, userController.numBubbleSort);
    router.get('/api/distinc-42', userController.authenticateToken, userController.distincArr);
    router.get('/api/longest-sub-string-43', userController.authenticateToken, userController.findLongestSubstring);
    router.get('/api/max-product-46', userController.authenticateToken, userController.findMaxProduct);
    router.get('/api/increasing-sequence-length-49', userController.authenticateToken, userController.increasingSequenceLength);
    router.get('/api/longest-common-string-410', userController.authenticateToken, userController.findLongestCommonSubstring);
    router.get('/api/reverse-array-51', userController.authenticateToken, userController.reverseArr);
    router.get('/api/remake-chunk-52', userController.authenticateToken, userController.remakeChunk);
    router.get('/api/uniq-53', userController.authenticateToken, userController.uniq);
    router.get('/api/uniq-array-54', userController.authenticateToken, userController.uniqArr);
    router.get('/api/group-by-55', userController.authenticateToken, userController.groupBy);
    router.get('/api/trimall-56', userController.authenticateToken, userController.trimAll);
    router.get('/api/mapkey-57', userController.authenticateToken, userController.mapKeys);
    router.get('/api/switch-order-58', userController.authenticateToken, userController.switchOrder);

    router.get('/api/infix-to-postfix', userController.authenticateToken, userController.toPostfix);





    app.post('/api/read-excel', upload.single('avatar'), readFileExcel)






    return app.use("/", router);
}
module.exports = initWebRoutes