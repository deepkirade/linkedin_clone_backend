
const job = require("../models/job_model")
const User = require('../models/user-model')
const Company = require('../models/company-model')



const postjob = async (req, res) => {
    try {
        let user = req.user
        if (!user) {
            res.status(400).json({ message: "please login first", success: false })
        } 
        const userid = user.id
        // await job.deleteMany({})
        let { title, location, salary, description, posted_by,skillsrequired,company } = req.body
        
        let jobdata = await job.create
            ({
                title, location, salary, description, posted_by:userid ,company:company ? company :userid, skillsrequired: skillsrequired.split(",")
            })
            if (company) {
              companydata = await Company.findById(company)
                companydata.jobs.push(jobdata._id);
                await companydata.save();
              }

        res.status(201).json({ message: "job posted successfully", success: true, jobdata, })
    } catch (error) {
        console.log(error)
    }
}

const getalljob = async (req, res) => {
    try {
        const posts = await job.find().populate({ path: "posted_by" });
        res.send(posts)
        console.log("posts send succesfully ")
    } catch (error) {

    }
}

const getjobsbyid = async (req, res) => {
    try {
        const jobid = req.params.id
        const jobinfo = await job.findById(jobid).populate({ path: "posted_by" })
        if (!jobinfo) {
            res.status(400).json({ message: "job not found", success: false })
        }
        return res.status(200).json({ jobinfo, success: true })

    } catch (error) {
        console.log(error)

    }

}

const getadminjob = async (req, res) => {

    try {

        const adminid = req.user.id

        const posts = await job.find({ posted_by: adminid }).populate({ path: "posted_by" })
        if (posts == "") {
            res.status(200).json("job not found")
        }
        else { res.status(200).json(posts) }

    } catch (error) {

        res.status(200).json("job not found")
    }
}

// content-based filtering
const recommendedjob = async (req,res)=>{
    try {

        const userid = req.user.id
        const user = await User.findById(userid)
        const jobs = await job.find()
        const recommendedjobs = await jobs.filter((job)=>job.skillsrequired.some((skill)=>user.skills.includes(skill)))
  
        if(recommendedjobs ==""){return res.send("No found recommeded job")}
        res.status(200).send(recommendedjobs)

    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
}

const recommededconnection= async (req,res)=>{

 try{   
    const userid = req.user.id
    const user = await User.findById(userid)
    const allusers =await User.find({_id:{$ne:userid}})
  const   recommededconnections= await allusers.filter((otheruser)=>otheruser.skills.some((skill)=>user.skills.includes(skill) ))
    if(recommededconnections ==""){return res.send("No found recommeded connection")}
    res.status(200).send(recommededconnections)
} catch (error) {
    res.status(400).json({ error: error.message });  
}
}





module.exports = { postjob, getalljob, getjobsbyid, getadminjob,recommendedjob ,recommededconnection}