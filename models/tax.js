const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tax = new Schema(
  {
    //----------------------------- Tax
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    taxRateName: {
      type: String,
      default: null,
    },
    taxRatePercentage: {
      type: Number,
      default: null,
    },
    availableTaxRate: {
      type: Schema.Types.ObjectId,
      ref: "Tax",
      default: null,
    },
    club: [{
      type: Schema.Types.ObjectId,
      ref: "Club",
      default: null,
    }],
    taxRateType: {
      type: String,
      default: null,
    },
    //--------------------- Add dicount
    discountName: {
      type: String,
      default: null
    },
    percentage: {
      type: String,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    availableDiscount: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    catalog: [
      {
        type: Schema.Types.ObjectId,
        ref: "Catalog",
        default: null,
      },
    ],
    membershipPlan: [{
      type: Schema.Types.ObjectId,
      ref: "MembershipPlan",
      default: null,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Tax = mongoose.model("Tax", tax);
module.exports = Tax;
