const { default: mongoose } = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    position: {
      type: Number,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
