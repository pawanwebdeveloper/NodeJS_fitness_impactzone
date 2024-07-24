const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agreementTemplate = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    club: [
      {
        type: Schema.Types.ObjectId,
        ref: "Club",
        default: null,
      },
    ],
    name: {
      type: String,
      default: null,
    },
    htmlContent: {
      type: String,
      default: null,
    },
    cssContent: {
      type: String,
      default: null,
    },
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

const AgreementTemplate = mongoose.model(
  "AgreementTemplate",
  agreementTemplate
);

const agreementCategory = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    subCategories: {
      type: Array,
    },
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

const AgreementCategory = mongoose.model(
  "AgreementCategory",
  agreementCategory
);

const asset = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    url: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Asset = mongoose.model("Asset", asset);

const assessedFee = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String, //Annual Fee,Late Fee,Decline Fee,No Show Fee, Freeze Fee, Cancellation Fee
      default: null,
    },
    profitCenter: {
      type: Schema.Types.ObjectId,
      ref: "ProfitCenter",
      default: null,
    },
    amount: {
      type: Number,
      default: null,
    },
    recurring: {
      type: String,
      default: null,
    },
    //--------------------------------------------- Prefered due date
    preferedDueDate: {
      type: String, //Month and Day,Number of Days from Begin Date
      default: null,
    },
    noOfDays: {
      type: Number,
      default: null,
    },
    noOfMonths: {
      type: Number,
      default: null,
    },
    //---------------------------------------------Clubs
    clubs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Club",
        default: null,
      },
    ],
    membershipPlan: [],
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

const AssessedFee = mongoose.model("AssessedFee", assessedFee);

//------------------------------------------------- Member ship plan--------------------------------------------------------

const membershipPlan = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "AgreementCategory",
      default: null,
    },
    subCategory: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    club: {
      type: Schema.Types.ObjectId,
      ref: "Club",
      default: null,
    },
    membershipType: {
      type: Schema.Types.ObjectId,
      ref: "MembershipType",
      default: null,
    },
    agreementTemplate: {
      type: Schema.Types.ObjectId,
      ref: "AgreementTemplate",
      default: null,
    },
    //--------------------------------------------- Assessed feed
    assessedFee: [
      {
        type: Schema.Types.ObjectId,
        ref: "AssessedFee",
        default: null,
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Catalog",
        default: null,
      },
    ],

    //------------------------------------ Contract options
    autoPay: {
      type: String,
      default: null,
    },
    oftenClientCharged: {
      type: String,
      default: null,
    },
    timePeriod: {
      type: Number,
      default: null,
    },
    noOfAutopays: {
      type: Number,
      default: null,
    },
    whenClientCharged: {
      type: String, //set it to in string later decide what type we need
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
    afterSixPayments: {
      type: String,
      default: null,
    },
    sellOnline: {
      type: String,
      default: null,
    },
    onlineDescription: {
      type: String,
      default: null,
    },
    noOfMembers: {
      type: Number,
      default: 0,
    },
    oneTimePlan: {
      type: String,
      default: null,
    },
    membershipPlan: [
      {
        type: Schema.Types.ObjectId,
        ref: "MembershipPlan",
        default: [],
      },
    ],
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

const MembershipPlan = mongoose.model("MembershipPlan", membershipPlan);

//--------------------------------------------------- Aggrement promotions

const aggrementPromotion = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    code: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    membershipPlan: {
      type: Schema.Types.ObjectId,
      ref: "MembershipPlan",
      default: null,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },

    uses: {
      type: Number,
      default: null,
    },
    promotionType: {
      type: String,
      default: null,
    },
    amount: {
      type: String,
      default: null,
    },
    amountType: {
      type: String,
      default: null,
    },
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

const AggrementPromotion = mongoose.model(
  "AggrementPromotion",
  aggrementPromotion
);

module.exports = {
  AgreementTemplate,
  AgreementCategory,
  Asset,
  AssessedFee,
  MembershipPlan,
  AggrementPromotion,
};
