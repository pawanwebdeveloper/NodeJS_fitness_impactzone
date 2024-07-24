const { error, success } = require("../utils/response");
const {
  AgreementTemplate,
  AgreementCategory,
  AssessedFee,
  AggrementPromotion,
} = require("../models/agreement");
const Paginate = require("../services/pagination");
const { Club } = require("../models/company");
const mongoose = require("mongoose");

const objectId = mongoose.Types.ObjectId;

module.exports = {
 
  agreementTemplate: {
    getAll: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        const { isActive, club } = req.query;

        let pipeline = [
          { $match: { isDeleted: false, company: companyId } },
          {
            $lookup: {
              from: Club.collection.name,
              localField: "club",
              foreignField: "_id",
              as: "club",
            },
          },
        ];
        //--------------------- is active----------
        if (isActive !== undefined) {
          pipeline.push({
            $match: {
              isActive: isActive === "true", // Simplified condition
            },
          });
        }

        //--------------------- club-------------------
        if (req.query.club === "all") {
          console.log("Showing all records.");
          // No need for filtering by club, proceed without adding to the pipeline
        } else if (club) {
          try {
            const clubIds = new mongoose.Types.ObjectId(club);
            console.log("Filtering by clubs:", clubIds);
            pipeline.push({
              $match: { "club._id": clubIds },
            });
          } catch (err) {
            console.error("Error applying club filter:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
        } else {
          console.log("No specific club provided, showing all records.");
          // No need for filtering by club, proceed without adding to the pipeline
        }

        let { data, paginationAndSort } = await Paginate(AgreementTemplate, {
          pipeline,
          ...req.query,
        });
        if (data) {
          const clubNames = data.map((agreement) => {
            return agreement.club.map((club) => club.name);
          });
          console.log("clubNames", clubNames);

          data.forEach((agreement, index) => {
            agreement.clubs = clubNames[index];
            delete agreement.club;
          });

          return res
            .status(200)
            .json(
              await success("AgreementTemplate List", data, paginationAndSort)
            );
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    getOne: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await AgreementTemplate.findById(id);
        if (data) {
          return res
            .status(200)
            .json(await success("AgreementTemplate Info", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    post: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        let { club, name, htmlContent, cssContent } = req.body;
        let data = await AgreementTemplate.create({
          club,
          name,
          htmlContent,
          cssContent,
          company: companyId,
        });
        if (data) {
          return res
            .status(200)
            .json(
              await success("AgreementTemplate Created Successfully", data)
            );
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    put: async (req, res) => {
      try {
        let id = req.params.id;
        let { club, name, htmlContent, cssContent } = req.body;
        let data = await AgreementTemplate.findOneAndUpdate(
          { _id: id },
          { club, name, htmlContent, cssContent },
          { new: true }
        );
        if (data) {
          return res
            .status(200)
            .json(
              await success("AgreementTemplate updated Successfully", data)
            );
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    delete: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await AgreementTemplate.findOneAndUpdate(
          { _id: id },
          { isDeleted: true },
          { new: true }
        );
        if (data) {
          return res
            .status(200)
            .json(await success("AgreementTemplate Deleted", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
  },
  agreementCategory: {
    getAll: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        let pipeline = [{ $match: { isDeleted: false, company: companyId } }];
        let { data, paginationAndSort } = await Paginate(AgreementCategory, {
          pipeline,
          ...req.query,
        });
        if (data) {
          return res
            .status(200)
            .json(
              await success("AgreementCategory List", data, paginationAndSort)
            );
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    getOne: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await AgreementCategory.findById(id);
        if (data) {
          return res
            .status(200)
            .json(await success("AgreementCategory Info", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    post: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        let { name, subCategories, isActive } = req.body;
        let data = await AgreementCategory.create({
          name,
          subCategories,
          company: companyId,
          isActive,
        });
        if (data) {
          return res
            .status(200)
            .json(
              await success("AgreementCategory Created Successfully", data)
            );
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    put: async (req, res) => {
      try {
        let id = req.params.id;
        let { name, subCategories, isActive } = req.body;
        let data = await AgreementCategory.findOneAndUpdate(
          { _id: id },
          { name, subCategories, isActive },
          { new: true }
        );
        if (data) {
          return res
            .status(200)
            .json(
              await success("AgreementCategory updated Successfully", data)
            );
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    delete: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await AgreementCategory.findOneAndUpdate(
          { _id: id },
          { isDeleted: true },
          { new: true }
        );
        if (data) {
          return res
            .status(200)
            .json(await success("AgreementCategory Deleted", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
  },
  assessedFee: {
    getAll: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        let { isActive, clubs, profitCenter } = req.query;
        let pipeline = [
          { $match: { isDeleted: false, company: companyId } },
          {
            $lookup: {
              from: "clubs",
              localField: "clubs",
              pipeline: [{ $project: { name: 1 } }],
              foreignField: "_id",
              as: "clubs",
            },
          },
          {
            $lookup: {
              from: "profitcenters",
              localField: "profitCenter",
              foreignField: "_id",
              as: "profitCenter",
            },
          },
          {
            $addFields: {
              profitCenter: { $first: "$profitCenter.name" },
              profitCenterId: { $first: "$profitCenter._id" },
            },
          },
        ];

        // Adjust pipeline based on isActive query parameter
        if (isActive === "active") {
          pipeline.push({
            $match: {
              isActive: true,
            },
          });
        } else if (isActive === "inactive") {
          pipeline.push({
            $match: {
              isActive: false,
            },
          });
        }

        // Filter by clubs array
        if (Array.isArray(clubs) && clubs.length > 0) {
          let clubIds = clubs.map((clubId) => new objectId(clubId));
          pipeline.push({
            $match: {
              "clubs._id": { $in: clubIds },
            },
          });
        }

        // Filter by profitCenter array
        if (Array.isArray(profitCenter)) {
          let profitCenterIds = profitCenter.map(
            (profitCenterId) => new objectId(profitCenterId)
          );
          console.log("profitCenterIds", profitCenterIds);

          pipeline.push({
            $match: {
              profitCenterId: { $in: profitCenterIds },
            },
          });
        }
        console.log(pipeline);
        let { data, paginationAndSort } = await Paginate(AssessedFee, {
          pipeline,
          ...req.query,
        });

        if (data) {
          return res
            .status(200)
            .json(await success("Assessed Fee List", data, paginationAndSort));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },

    getOne: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await AssessedFee.findById(id);
        if (data) {
          return res.status(200).json(await success("Asset Info", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    post: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        let {
          name,
          type,
          profitCenter,
          amount,
          recurring,
          preferedDueDate,
          noOfDays,
          noOfMonths,
          clubs,
          membershipPlan,
        } = req.body;
        let data = await AssessedFee.create({
          name,
          type,
          profitCenter,
          amount,
          recurring,
          preferedDueDate,
          noOfDays,
          noOfMonths,
          clubs,
          membershipPlan,
          company: companyId,
        });
        if (data) {
          return res
            .status(200)
            .json(await success("Assessed Created Successfully", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    put: async (req, res) => {
      try {
        let id = req.params.id;
        let {
          name,
          type, //Annual Fee,Late Fee,Decline Fee,No Show Fee, Freeze Fee, Cancellation Fee
          profitCenter,
          amount,
          recurring,
          preferedDueDate,
          noOfDays,
          noOfMonths,
          clubs,
          membershipPlan,
        } = req.body;

        let data;
        data = await AssessedFee.findOneAndUpdate(
          { _id: id },
          {
            name,
            type,
            profitCenter,
            amount,
            recurring,
            preferedDueDate,
            noOfDays,
            noOfMonths,
            clubs,
            membershipPlan,
          },
          { new: true }
        );
        if (type === "Late Fee") {
          data = await AssessedFee.findByIdAndUpdate(
            id,
            {
              noOfMonths: null,
            },
            { new: true }
          );
        } else if (type === "Annual Fee") {
          data = await AssessedFee.findByIdAndUpdate(
            id,
            {
              noOfDays,
              noOfMonths,
            },
            { new: true }
          );
        } else if (type === "Decline Fee") {
          data = await AssessedFee.findByIdAndUpdate(
            id,
            {
              noOfMonths: null,
            },
            { new: true }
          );
        } else {
          data = await AssessedFee.findByIdAndUpdate(
            id,
            {
              noOfDays: null,
              noOfMonths: null,
            },
            { new: true }
          );
        }

        if (data) {
          return res
            .status(200)
            .json(await success("Assessed updated Successfully", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    delete: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await AssessedFee.findOneAndUpdate(
          { _id: id },
          { isDeleted: true },
          { new: true }
        );
        if (data) {
          return res.status(200).json(await success("Assessed Deleted", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
  },
  aggrementPromotion: {
    getAll: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        let pipeline = [
          { $match: { isDeleted: false, company: companyId } },
          {
            $lookup: {
              from: "membershipplans",
              localField: "membershipPlan",
              foreignField: "_id",
              as: "membershipPlan",
            },
          },
          {
            $addFields: {
              membershipPlan: { $first: "$membershipPlan.name" },
            },
          },
        ];
        let { data, paginationAndSort } = await Paginate(AggrementPromotion, {
          pipeline,
          ...req.query,
        });
        if (data) {
          return res
            .status(200)
            .json(
              await success("Aggrement Promotion List", data, paginationAndSort)
            );
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    getOne: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await AggrementPromotion.findById(id);
        if (data) {
          return res
            .status(200)
            .json(await success("Aggrement Promotion Info", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    post: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        let {
          code,
          name,
          membershipPlan,
          startDate,
          endDate,
          uses,
          promotionType,
          amount,
          amountType,
          isActive,
        } = req.body;
        let data = await AggrementPromotion.create({
          code,
          name,
          membershipPlan,
          startDate,
          endDate,
          uses,
          promotionType,
          amount,
          amountType,
          isActive,
          company: companyId,
        });
        if (data) {
          return res
            .status(200)
            .json(
              await success("AgreementTemplate Created Successfully", data)
            );
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    put: async (req, res) => {
      try {
        let id = req.params.id;
        let {
          code,
          name,
          membershipPlan,
          startDate,
          endDate,
          uses,
          promotionType,
          amount,
          amountType,
          isActive,
        } = req.body;
        let data = await AggrementPromotion.findOneAndUpdate(
          { _id: id },
          {
            code,
            name,
            membershipPlan,
            startDate,
            endDate,
            uses,
            promotionType,
            amount,
            amountType,
            isActive,
          },
          { new: true }
        );
        if (data) {
          return res
            .status(200)
            .json(
              await success("Aggrement Promotion updated Successfully", data)
            );
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
    delete: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await AggrementPromotion.findOneAndUpdate(
          { _id: id },
          { isDeleted: true },
          { new: true }
        );
        if (data) {
          return res
            .status(200)
            .json(await success("Aggrement Promotion Deleted", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },
  },
};
