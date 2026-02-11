const express = require('express');
const {
  createBanner,
  getBanners,
  deleteBanner,
  updateBanner,
} = require('../controllers/bannerController');
const upload = require('../middlewares/uploadMiddleware');
const bannerRouter = express.Router();

bannerRouter.get('/', getBanners);
bannerRouter.post('/', upload.array('image'), createBanner);
bannerRouter.put('/:id', upload.single('image'), updateBanner);
bannerRouter.delete('/:id', deleteBanner);

module.exports = bannerRouter;
