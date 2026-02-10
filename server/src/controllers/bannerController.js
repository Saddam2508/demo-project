const deleteFile = require('../../utils/deleteFile');
const Banner = require('../models/bannerModel');

// ======================= CREATE BANNER =======================
const createBanner = async (req, res) => {
  try {
    const { title, subTitle, link, position, isActive } = req.body || {};

    // Multer uploaded file থেকে public path তৈরি
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title) {
      throw new Error('Title is required');
    }
    if (!image) {
      throw new Error('Image is required');
    }

    const bannerData = {
      title,
      subTitle,
      link,
      position: Number(position) || 0,
      isActive: isActive ? true : false,
      image,
    };

    const banner = await Banner.create(bannerData);

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

// ======================= GET BANNERS =======================
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

// ======================= UPDATE BANNER =======================
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subTitle, link, position, isActive } = req.body || {};

    // শুধুমাত্র যদি নতুন image আপলোড হয়, তখন path update হবে
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = {
      title,
      subTitle,
      link,
      position: Number(position) || 0,
      isActive: isActive ? true : false,
      ...(image && { image }), // image field update হবে শুধুমাত্র নতুন আপলোড হলে
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

// ======================= DELETE BANNER =======================
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

    // ইমেজ ডিলিট (ফাইল সিস্টেম থেকে)
    if (banner.image) {
      deleteFile(`src${banner.image}`); // src/uploads/... ঠিক path
    }

    // ডাটাবেস থেকে ডিলিট
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
