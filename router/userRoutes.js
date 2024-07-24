const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");

const userAuthControllers = require("../controllers/userAuthControllers");
const reasonCode = require("../controllers/reasonCodeContollers");

const classes = require("../controllers/employeeClassesControllers");

const title = require("../controllers/jobTitleControllers");
const { club, company } = require("../controllers/companyControllers");
const { isEmployeeEmailAvailable } = require("../middlewares/common");

//.....................Profile.....................
router.get("/profile", userAuthControllers.profileGet);
router.put("/profile", userAuthControllers.profileUpdate);

//.....................Company.....................
router.get("/company", company.myCompany);
router.put("/company", company.updateMyCompany);

//.....................Clubs.....................
router.get("/clubs", club.getAll);
router.get("/clubs/:id", club.getOne);
router.put("/clubs/:id", club.put);
router.delete("/clubs/:id", club.delete);

//..................... Agreement Template .....................
const {
  agreementTemplate,
  agreementCategory,
  asset,
  assessedFee,
  membershipPlan,
  aggrementPromotion,
} = require("../controllers/agreementControllers");

router.post("/asset", upload.array("files"), asset.post);
router.get("/asset", asset.getAll);
router.get("/asset/:id", asset.getOne);
router.put("/asset/:id", asset.put);
router.delete("/asset/:id", asset.delete);

router.post("/agreement-template", agreementTemplate.post);
router.get("/agreement-template", agreementTemplate.getAll);
router.get("/agreement-template/:id", agreementTemplate.getOne);
router.put("/agreement-template/:id", agreementTemplate.put);
router.delete("/agreement-template/:id", agreementTemplate.delete);

router.post("/agreement-promotion", aggrementPromotion.post);
router.get("/agreement-promotion", aggrementPromotion.getAll);
router.get("/agreement-promotion/:id", aggrementPromotion.getOne);
router.put("/agreement-promotion/:id", aggrementPromotion.put);
router.delete("/agreement-promotion/:id", aggrementPromotion.delete);

router.post("/membership-plan", membershipPlan.post);
router.get("/membership-plan", membershipPlan.getAll);
router.get("/membership-plan/:id", membershipPlan.getOne);
router.put("/membership-plan/:id", membershipPlan.put);
router.delete("/membership-plan/:id", membershipPlan.delete);

router.post("/agreement-category", agreementCategory.post);
router.get("/agreement-category", agreementCategory.getAll);
router.get("/agreement-category/:id", agreementCategory.getOne);
router.put("/agreement-category/:id", agreementCategory.put);
router.delete("/agreement-category/:id", agreementCategory.delete);

router.post("/assessed-fee", assessedFee.post);
router.get("/assessed-fee", assessedFee.getAll);
router.get("/assessed-fee/:id", assessedFee.getOne);
router.put("/assessed-fee/:id", assessedFee.put);
router.delete("/assessed-fee/:id", assessedFee.delete);

const {
  campaign,
  campaignGroup,
} = require("../controllers/campaignControllers");
router.post("/campaign-group", campaignGroup.post);
router.get("/campaign-group", campaignGroup.getAll);
router.get("/campaign-group/:id", campaignGroup.getOne);
router.put("/campaign-group/:id", campaignGroup.put);
router.delete("/campaign-group/:id", campaignGroup.delete);

router.post("/campaign", campaign.post);
router.get("/campaign", campaign.getAll);
router.get("/campaign/:id", campaign.getOne);
router.put("/campaign/:id", campaign.put);
router.delete("/campaign/:id", campaign.delete);

const {
  resourceType,
  resource,
} = require("../controllers/resourceControllers");
router.post("/resource-type", resourceType.post);
router.get("/resource-type", resourceType.getAll);
router.get("/resource-type/:id", resourceType.getOne);
router.put("/resource-type/:id", resourceType.put);
router.delete("/resource-type/:id", resourceType.delete);

router.post("/resource", resource.post);
router.get("/resource", resource.getAll);
router.get("/resource/:id", resource.getOne);
router.put("/resource/:id", resource.put);
router.delete("/resource/:id", resource.delete);

//.....................Inventory.....................
const {
  profitCenter,
  inventoryCategory,
  vendor,
  commissionGroup,
  referralGroup,
  catalog,
  usage,
  variation,
} = require("../controllers/inventoryControllers");

router.post("/profit-center", profitCenter.post);
router.get("/profit-center", profitCenter.getAll);
router.get("/profit-center/:id", profitCenter.getOne);
router.put("/profit-center/:id", profitCenter.put);
router.delete("/profit-center/:id", profitCenter.delete);

router.post("/inventory-category", inventoryCategory.post);
router.get("/inventory-category", inventoryCategory.getAll);
router.get("/inventory-category/:id", inventoryCategory.getOne);
router.put("/inventory-category/:id", inventoryCategory.put);
router.delete("/inventory-category/:id", inventoryCategory.delete);

router.post("/vendor", vendor.post);
router.get("/vendor", vendor.getAll);
router.get("/vendor/:id", vendor.getOne);
router.put("/vendor/:id", vendor.put);
router.delete("/vendor/:id", vendor.delete);

router.post("/commission-group", commissionGroup.post);
router.get("/commission-group", commissionGroup.getAll);
router.get("/commission-group/:id", commissionGroup.getOne);
router.put("/commission-group/:id", commissionGroup.put);
router.delete("/commission-group/:id", commissionGroup.delete);

router.post("/referral-group", referralGroup.post);
router.get("/referral-group", referralGroup.getAll);
router.get("/referral-group/:id", referralGroup.getOne);
router.put("/referral-group/:id", referralGroup.put);
router.delete("/referral-group/:id", referralGroup.delete);

router.post("/inventory-catalog", catalog.post);
router.get("/inventory-catalog", catalog.getAll);
router.get("/inventory-catalog/:id", catalog.getOne);
router.put("/inventory-catalog/:id", catalog.put);
router.delete("/inventory-catalog/:id", catalog.delete);

router.put("/inventory-usage/:id", usage.put);
router.get("/inventory-usage/:id", usage.getAll);
router.put("/inventory-usage-type/:id", usage.delete);
// router.get("/inventory-usage/:id", catalog.getOne);
// router.put("/inventory-usage/:id", catalog.put);
router.delete("/inventory-usage/:id", usage.deleteAll);

router.get("/inventory-variation/:id", variation.getAll);
router.get("/inventory-variation-detail/:id", variation.getOne);
router.put("/inventory-variation/:id", variation.put);
router.put("/inventory-sub-variation/:id", variation.subVariationUpdate);
router.delete("/inventory-variation/:id", variation.delete); // _id in params
router.delete("/inventory-variation-all/:id", variation.removeAll); // catalog id in params
router.delete("/inventory-sub-variation/:id", variation.deleteSubVariation); // catalog id in params

//..................... Member Setup................................................
const memberSetup = require("../controllers/memberSetupControllers");

router.post("/member-setup", memberSetup.post);
router.get("/member-setup", memberSetup.getAll);
router.get("/member-setup/:id", memberSetup.getOne);
router.put("/member-setup/:id", memberSetup.put);
router.delete("/member-setup/:id", memberSetup.delete);
router.delete("/services/:id", memberSetup.removeAllServices)

//...................... POS ................................
const {
  tax,
  paymentMethod,
  discount,
} = require("../controllers/posControllers");

router.post("/tax", tax.post);
router.get("/tax", tax.getAll);
router.get("/tax/:id", tax.getOne);
router.put("/tax/:id", tax.put);
router.delete("/tax/:id", tax.delete);

router.post("/payment-method", paymentMethod.post);
router.get("/payment-method", paymentMethod.getAll);
router.get("/payment-method/:id", paymentMethod.getOne);
router.put("/payment-method/:id", paymentMethod.put);
router.delete("/payment-method/:id", paymentMethod.delete);

router.post("/discount", discount.post);
router.get("/discount", discount.getAll);
router.get("/discount/:id", discount.getOne);
router.put("/discount/:id", discount.put);
router.delete("/discount/:id", discount.delete);

module.exports = router;
