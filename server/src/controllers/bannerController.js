const deleteFile = require('../../utils/deleteFile');
const Banner = require('../models/bannerModel');

const createBanner = async (req, res) => {
  try {
    const { title, subTitle, link, position, isActive } = req.body || {};

    const image = req.file ? req.file.path : null;
    if (!title) {
      throw new Error('Title is required');
    }
    if (!image) {
      throw new Error('Image is required');
    }
    if (image.size > 5 * 1024 * 1024) {
      throw new Error('Image size should be less than 5MB');
    }
    //banner object create
    const bannerData = {
      title,
      subTitle,
      link,
      position,
      isActive,
      image,
    };

    const banner = await Banner.create(bannerData);

    // Save bannerData to database
    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({
      success: true,
      message: 'Banners fetched successfully',
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subTitle, link, position, isActive } = req.body || {};
    const image = req.file ? req.file.path : null;

    const updateData = {
      title,
      subTitle,
      link,
      position,
      isActive,
      image,
    };

    const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Banner updated successfully',
      data: updatedBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found',
      });
    }

    // ইমেজ ডিলিট
    if (banner.image) {
      deleteFile(banner.image);
    }

    // ডাটাবেস থেকে banner ডিলিট
    await Banner.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Banner deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner,
};
