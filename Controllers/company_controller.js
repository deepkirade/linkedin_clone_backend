const Company = require("../models/company-model")
const User = require('../models/user-model')

 const registerCompany = async (req, res) => {
    try {
        const {  companyName, description, location } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            description,
            location,
            userId: req.user.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
const getallCompany = async (req, res) => {
    try {
        const companies = await Company.find();
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

 const getCompany = async (req, res) => {
    try {
        const userId = req.user.id; // logged in user id
        const companies = await Company.find({ userId });
        if (companies=="") {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {registerCompany,getCompany,getallCompany}