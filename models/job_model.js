const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({


    title: {
        type: String,
    },
    location: {
        type: String,
    },
    salary: {
        type: String,
    },

    description: {
        type: String,
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company:{
          type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    skillsrequired: [
        {
            type: String
        }
    ],
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ]


}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;