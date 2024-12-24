
const Application = require("../models/application-model")
const job_model = require("../models/job_model")

const applyjob = async (req, res) => {
    try {

        const userid = req.user.id
      
        const jobid = req.params.id
        if (!jobid) {
            return res.status(400).json({
                message: "job id required",
                success: false
            })
        }

        const existingapplication = await Application.findOne({ job: jobid, applicant: userid })
        if (existingapplication) {
            return res.status(400).json({
                existingapplication,
                message: 'you have already applied for this job',
                success: false
            });
        }

        const job = await job_model.findById(jobid)
        if (!job) {
            res.status(400).json({
                message: "job not found",
                success: false
            })
        }

        const newApplication = await Application.create({

            applicant: userid,
            job: jobid
        });

        job.applications.push(newApplication._id)
        await job.save()
        return res.status(200).json({
            message: "job applied successfully",
            success: true,
            newApplication
        })

    }
    catch (error) {
        console.log(error)
    }
}

const getAppliedjobs = async (req, res) => {
    try {
        const userid = req.user.id
        // await Application.deleteMany({})
        const application = await Application.find({ applicant: userid }).populate({ path: "job" , populate:{path : "posted_by"} }).populate({ path: "applicant" })
        if(!application){
            return res.status(400).json({message:"NO applications", success:false})
        }
        return res.status(200).json({application, success:true})

    } catch (error) {
        console.log(error)
    }
}

const getapplicants = async(req,res)=>{
    try {
    const jobid =  req.params.id
    const job  = await job_model.findById(jobid).populate({path:"applications", populate:{path :"applicant"} } )
    if (!job) {
        res.status(400).json({
            message: "job not found",
            success: false
        })
    }
    return res.status(200).json({job, success:true})
} catch (error) {
    console.log(error)
}
}



module.exports = { applyjob, getAppliedjobs, getapplicants}