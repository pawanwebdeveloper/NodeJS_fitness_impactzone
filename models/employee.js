const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    isClassLevel: {
      type: Schema.Types.ObjectId,
      ref: "Level",
      default: null,
    },
    isAppointmentLevel: {
      type: Schema.Types.ObjectId,
      ref: "Level",
      default: null,
    },
    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYEE"],
      default: "EMPLOYEE",
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    middleInitial: {
      type: String,
      default: null,
    },
    jobTitle: {
      type: Schema.Types.ObjectId,
      ref: "JobTitle",
    },
    dob: {
      type: String,
      default: null,
    },
    socialSecurity: {
      type: String,
      default: null,
    },
    barCode: {
      type: Number,
      default: null,
    },
    accessCode: {
      type: String,
      default: null,
    },
    multiClubClockIn: {
      type: Boolean,
      default: false,
    },
    hireDate: {
      type: String,
      default: null,
    },
    terminationDate: {
      type: String,
      default: null,
    },
    adpId: {
      type: String,
      default: null,
    },
    primaryPhone: {
      type: String,
      default: null,
    },
    workPhone: {
      type: String,
      default: null,
    },
    workPhoneExt: {
      type: String,
      default: null,
    },
    mobilePhone: {
      type: String,
      default: null,
    },
    faxPhone: {
      type: String,
      default: null,
    },
    emergencyPhone: {
      type: String,
      default: null,
    },
    emergencyPhoneExt: {
      type: String,
      deafult: null,
    },
    street: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    zipCode: {
      type: String,
      default: null,
    },
    emailNotification: {
      type: Boolean,
      default: true,
    },
    onlineNickName: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: null,
    },
    socialMedia: {
      type: String,
      default: null,
    },
    securityRoles: [],
    image: {
      type: String,
    },
    alternateEmail: {
      type: String,
      default: null,
    },
    securityRoles: [
      {
        type: Schema.Types.ObjectId,
        ref: "SecurityRole",
      },
    ],
    departments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Department",
      },
    ],

    reportDataAccess: [
      {
        type: Schema.Types.ObjectId,
        ref: "Club",
      },
    ],
    clubs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Club",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
