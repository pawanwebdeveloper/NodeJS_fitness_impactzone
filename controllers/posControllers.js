const { error, success } = require("../utils/response");

const Tax = require("../models/tax");
const PaymentMethod = require("../models/paymentMethod");
const Discount = require("../models/discount");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const Paginate = require("../services/pagination");

module.exports = {
  tax: {
    getAll: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        let { isActive } = req.query; // Extract isActive from query parameters
        let pipeline = [{ $match: { isDeleted: false, company: companyId } }];

        //--------------------- is active----------
        if (isActive !== undefined && isActive !== "all") {
          // If isActive is "active" or "inactive", push a match stage to the pipeline
          pipeline.push({
            $match: {
              isActive: isActive === "active", // "active" translates to true, "inactive" translates to false
            },
          });
        } else if (isActive === "all") {
          // If isActive is "all", we don't need to add any $match stage as we want all documents
          // No action needed, all documents will be included
        }

        let { data, paginationAndSort } = await Paginate(Tax, {
          pipeline,
          ...req.query,
          isActive, // Include isActive parameter
        });
        if (data) {
          return res
            .status(200)
            .json(await success("Tax List", data, paginationAndSort));
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
        let data = await Tax.findById(id);
        if (data) {
          return res.status(200).json(await success("Tax Info", data));
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
          taxRateName,
          taxRatePercentage,
          availableTaxRate,
          club,
          taxRateType,
          isActive,
        } = req.body;
        let data = await Tax.create({
          company: companyId,
          taxRateName,
          taxRatePercentage,
          availableTaxRate,
          club,
          taxRateType,
          isActive,
        });
        if (data) {
          return res
            .status(200)
            .json(await success("Tax Created Successfully", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log("catch err", err);
        return res.status(500).json(await error(err.message, err));
      }
    },
    put: async (req, res) => {
      try {
        let id = req.params.id;
        let {
          taxRateName,
          taxRatePercentage,
          availableTaxRate,
          club,
          taxRateType,
          isActive,
        } = req.body;
        let data = await Tax.findOneAndUpdate(
          { _id: id },
          {
            taxRateName,
            taxRatePercentage,
            availableTaxRate,
            club,
            taxRateType,
            isActive,
          },
          { new: true }
        );
        return res
          .status(200)
          .json(await success("Tax Updated Successfully", data));
      } catch (err) {
        console.log(err);
        return res.status(500).json(await error(err.message, err));
      }
    },
    delete: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await Tax.findOneAndUpdate(
          { _id: id },
          { isDeleted: true },
          { new: true }
        );
        if (data) {
          return res
            .status(200)
            .json(await success("POS Deleted Successfully", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json(await error(err.message, err));
      }
    },
  },
  paymentMethod: {
    getAll: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        let { isActive } = req.query; // Extract isActive from query parameters
        let pipeline = [{ $match: { isDeleted: false, company: companyId } }];

        //--------------------- is active----------
        if (isActive !== undefined && isActive !== "all") {
          // If isActive is "active" or "inactive", push a match stage to the pipeline
          pipeline.push({
            $match: {
              isActive: isActive === "active", // "active" translates to true, "inactive" translates to false
            },
          });
        } else if (isActive === "all") {
          // If isActive is "all", we don't need to add any $match stage as we want all documents
          // No action needed, all documents will be included
        }

        let { data, paginationAndSort } = await Paginate(PaymentMethod, {
          pipeline,
          ...req.query,
          isActive, // Include isActive parameter
        });

        // Ensure data is an array
        if (Array.isArray(data)) {
          // If data is an array, return it as it is with modified boolean values
          let modifiedData = data.map((item) => ({
            ...item,
            allowMultiple: item.allowMultiple === "true",
            allowNegativeDrawerAmount:
              item.allowNegativeDrawerAmount === "true",
            hideInPos: item.hideInPos === "true",
            income: item.income === "true",
            allowChange: item.allowChange === "true",
          }));

          console.log("Modified data:", modifiedData);
          return res
            .status(200)
            .json(
              await success(
                "Payment Method List",
                modifiedData,
                paginationAndSort
              )
            );
        } else {
          // If data is not an array, return it with modified boolean values
          let modifiedData = {
            ...data,
            allowMultiple: data.allowMultiple === "true",
            allowNegativeDrawerAmount:
              data.allowNegativeDrawerAmount === "true",
            hideInPos: data.hideInPos === "true",
            income: data.income === "true",
            allowChange: data.allowChange === "true",
          };

          console.log("Modified data:", modifiedData);
          return res
            .status(200)
            .json(
              await success(
                "Payment Method List",
                modifiedData,
                paginationAndSort
              )
            );
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(await error(err.message, err));
      }
    },

    getOne: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await PaymentMethod.findById(id);
        if (data) {
          return res
            .status(200)
            .json(await success("Payment Method Info", data));
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
          detail,
          count,
          income,
          allowMultiple,
          allowChange,
          requireMember,
          allowNegativeDrawerAmount,
          defaultReceiptCopies,
          signatureOnReceipt,
          hideInPos,
          code,
          isActive,
        } = req.body;
        let data = await PaymentMethod.create({
          company: companyId,
          name,
          detail,
          count,
          income,
          allowMultiple,
          allowChange,
          requireMember,
          allowNegativeDrawerAmount,
          defaultReceiptCopies,
          signatureOnReceipt,
          hideInPos,
          code,
          isActive,
        });
        if (data) {
          return res
            .status(200)
            .json(await success("Payment Method Created Successfully", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log("catch err", err);
        return res.status(500).json(await error(err.message, err));
      }
    },
    put: async (req, res) => {
      try {
        let id = req.params.id;
        let {
          name,
          detail,
          count,
          income,
          allowMultiple,
          allowChange,
          requireMember,
          allowNegativeDrawerAmount,
          defaultReceiptCopies,
          signatureOnReceipt,
          hideInPos,
          code,
          isActive,
        } = req.body;
        let data = await PaymentMethod.findOneAndUpdate(
          { _id: id },
          {
            name,
            detail,
            count,
            income,
            allowMultiple,
            allowChange,
            requireMember,
            allowNegativeDrawerAmount,
            defaultReceiptCopies,
            signatureOnReceipt,
            hideInPos,
            code,
            isActive,
          },
          { new: true }
        );
        return res
          .status(200)
          .json(await success("Payment Method Updated Successfully", data));
      } catch (err) {
        console.log(err);
        return res.status(500).json(await error(err.message, err));
      }
    },
    delete: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await PaymentMethod.findOneAndUpdate(
          { _id: id },
          { isDeleted: true },
          { new: true }
        );
        if (data) {
          return res
            .status(200)
            .json(await success("Payment Method Deleted Successfully", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json(await error(err.message, err));
      }
    },
  },
  discount: {
    getAll: async (req, res) => {
      try {
        let { companyId } = req.decoded;
        let { isActive } = req.query; // Extract isActive from query parameters
        let pipeline = [
          { $match: { isDeleted: false, company: companyId } },
          {
            $lookup: {
              from: "catalogs",
              localField: "services",
              pipeline: [{ $project: { name: 1 } }],
              foreignField: "_id",
              as: "catalog",
            },
          },
          {
            $lookup: {
              from: "membershipplans",
              localField: "membershipPlan",
              pipeline: [{ $project: { name: 1 } }],
              foreignField: "_id",
              as: "membershipPlan",
            },
          },
        ];
        //--------------------- is active----------
        if (isActive !== undefined && isActive !== "all") {
          // If isActive is "active" or "inactive", push a match stage to the pipeline
          pipeline.push({
            $match: {
              isActive: isActive === "active", // "active" translates to true, "inactive" translates to false
            },
          });
        } else if (isActive === "all") {
          // If isActive is "all", we don't need to add any $match stage as we want all documents
          // No action needed, all documents will be included
        }

        let { data, paginationAndSort } = await Paginate(Discount, {
          pipeline,
          ...req.query,
          isActive, // Include isActive parameter
        });
        if (data) {
          return res
            .status(200)
            .json(await success("Discount List", data, paginationAndSort));
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
        // let data = await Discount.findById(id);
        let data = await Discount.aggregate([
          {
            $match: {
              _id: new objectId(id),
            },
          },
          {
            $lookup: {
              from: "catalogs",
              localField: "services",
              foreignField: "_id",
              pipeline: [
                { $project: { name: 1, unitPrice: 1, upc: 1, _id: 1 } },
              ],
              as: "services",
            },
          },
          {
            $lookup: {
              from: "membershipplans",
              localField: "membershipPlan",
              foreignField: "_id",
              pipeline: [
                {
                  $lookup: {
                    from: "agreementcategories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                  },
                },
                {
                  $addFields: {
                    category: { $first: "$category.name" },
                  },
                },
                { $project: { name: 1, category: 1, noOfMembers: 1, _id: 1 } },
              ],
              as: "membershipPlan",
            },
          },
        ]);
        if (data) {
          return res.status(200).json(await success("Discount Info", data[0]));
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
          discountName,
          percentage,
          amountType,
          endDate,
          startDate,
          availableDiscount,
          description,
          membershipPlan,
          services,
          multiItemDiscount,
          multiItemDiscountCheck,
          isActive,
        } = req.body;
        let data = await Discount.create({
          company: companyId,
          discountName,
          percentage,
          amountType,
          endDate,
          startDate,
          availableDiscount,
          description,
          membershipPlan,
          services,
          multiItemDiscount,
          multiItemDiscountCheck,
          isActive,
        });
        if (data) {
          return res
            .status(200)
            .json(await success("Discount Created Successfully", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log("catch err", err);
        return res.status(500).json(await error(err.message, err));
      }
    },
    put: async (req, res) => {
      try {
        let id = req.params.id;
        let {
          discountName,
          percentage,
          amountType,
          endDate,
          startDate,
          availableDiscount,
          description,
          membershipPlan,
          services,
          multiItemDiscount,
          multiItemDiscountCheck,
          isActive,
        } = req.body;
        let data = await Discount.findOneAndUpdate(
          { _id: id },
          {
            discountName,
            percentage,
            amountType,
            endDate,
            startDate,
            availableDiscount,
            description,
            membershipPlan,
            services,
            multiItemDiscount,
            multiItemDiscountCheck,
            isActive,
          },
          { new: true }
        );
        return res
          .status(200)
          .json(await success("Discount Updated Successfully", data));
      } catch (err) {
        console.log(err);
        return res.status(500).json(await error(err.message, err));
      }
    },

    delete: async (req, res) => {
      try {
        let id = req.params.id;
        let data = await Discount.findOneAndUpdate(
          { _id: id },
          { isDeleted: true },
          { new: true }
        );
        if (data) {
          return res
            .status(200)
            .json(await success("Discount Deleted Successfully", data));
        } else {
          return res
            .status(200)
            .json(await error("something went wrong!", data));
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json(await error(err.message, err));
      }
    },
  },
};
