const bcrypt = require("bcryptjs");
const { success, error } = require("../utils/response");
const Employee = require("../models/employee");
const { generateRandomPassword } = require("../utils/generateOTP");
const { sendEmail } = require("../utils/sendEmail");
const { welcomeCompanyEmployee } = require("../utils/emailTemplates");
const Paginate = require("../services/pagination");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

module.exports = {
  getAll: async (req, res) => {
    try {
      let { companyId } = req.decoded;
      let pipeline = [
        { $match: { isDeleted: false, role: "EMPLOYEE", company: companyId } },
        {
          $lookup: {
            from: "classes",
            localField: "_id",
            foreignField: "employee",
            // pipeline: [
            //   {
            //     $project: {
            //       payType: true,
            //       isClassLevel: true,
            //       isDefaultPay: true,
            //     },
            //   },
            // ],
            as: "employeeClassData",
          },
        },
      ];
      let { data } = await Paginate(Employee, {
        pipeline,
        searchFields: ["firstName"],
        ...req.query,
      });
      if (data) {
        data.forEach((employee) => {
          employee.employeeClassData.forEach((item) => {
            item.label = item?.payType
              ?.replace(/_/g, " ")
              ?.toLowerCase()
              ?.split(" ")
              ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              ?.join(" ");
          });
        });
        return res.status(200).json(await success("Employee List", data));
      } else {
        return res.status(200).json(await error("something went wrong!", data));
      }
    } catch (err) {
      console.log("err", err);
      res.status(500).json(await error(err.message, err));
    }
  },
  getOne: async (req, res) => {
    try {
      let id = req.params.id;
      let data = await Employee.findById(id);
      if (data) {
        return res.status(200).json(await success("Employee Info", data));
      } else {
        return res.status(200).json(await error("something went wrong!", data));
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(await error(err.message, err));
    }
  },

  getEmployeeClass: async (req, res) => {
    try {
      let id = req.params.id;
      console.log("id", id);
      let data = await Employee.aggregate([
        { $match: { isDeleted: false, _id: new objectId(id) } },
        {
          $lookup: {
            from: "classes",
            localField: "_id",
            foreignField: "employee",
            pipeline: [
              {
                $project: {
                  payType: true,
                  isClassLevel: true,
                  isDefaultPay: true,
                },
              },
            ],
            as: "employeeClassData",
          },
        },
      ]);
      console.log("data", data);
      if (data) {
        data[0].employeeClassData.forEach((item) => {
          item.label = item?.payType
            ?.replace(/_/g, " ")
            ?.toLowerCase()
            ?.split(" ")
            ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            ?.join(" ");
        });
        return res.status(200).json(await success("Employee Info", data[0]));
        8;
      } else {
        return res.status(200).json(await error("something went wrong!", data));
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(await error(err.message, err));
    }
  },
  post: async (req, res) => {
    try {
      let { companyId } = req.decoded;
      let randomstring = await generateRandomPassword();
      const password = await bcrypt.hash(randomstring, 10);
      let data = await Employee.create({
        ...req.body,
        password,
        role: "EMPLOYEE",
        company: companyId,
      });

      await sendEmail(
        data.email,
        "Welcome onboard..",
        welcomeCompanyEmployee(
          req,
          data.firstName + " " + data.lastName,
          data.email,
          randomstring
        )
      );

      if (data) {
        return res
          .status(200)
          .json(await success("Employee Created Successfully", data));
      } else {
        return res.status(200).json(await error("something went wrong!", data));
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(await error(err.message, err));
    }
  },
  put: async (req, res) => {
    try {
      let id = req.params.id;
      console.log("req.body of employee put api", req.body);
      let data = await Employee.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        },
        { new: true }
      );
      if (data) {
        return res
          .status(200)
          .json(await success("Employee updated Successfully", data));
      } else {
        return res.status(200).json(await error("something went wrong!", data));
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(await error(err.message, err));
    }
  },
  delete: async (req, res) => {
    try {
      let id = req.params.id;
      let data = await Employee.findOneAndUpdate(
        { _id: id },
        { isDeleted: true },
        { new: true }
      );
      if (data) {
        return res.status(200).json(await success("Employee Deleted", data));
      } else {
        return res.status(200).json(await error("something went wrong!", data));
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(await error(err.message, err));
    }
  },
};
