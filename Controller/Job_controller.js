const { join } = require('path')
const {Application} = require('../Models/Application')
const {Job} = require('../Models/Job')
const { User } = require('../Models/User')
class JobController{


  static getAllJobs = async (req, res, next) =>{
    
    try {
        const jobs = await Job.getAll()
       
        if( jobs.length != 0  ){
        
          res.status(200).json(jobs)
        }
        else{
          res.status(404).json("No jobs")
        }
      
      
    } catch (error) {
      
      res.status(404).json('Error :' + error)
      
    }

  }
  static  getJob = async (req, res, next) =>{
      try {
        const id = req.params.id;
        const job = await Job.get(id);
        if(job.length != 0){
          res.status(200).json(job)
        }
        else{
          res.status(404).json("Thier is no Job")
        }
        
        
      } catch (error) {
        
        res.status(404).json('Error :' + error)
        
      }
  }
  static deleteJob = async(req ,res , next)=>{
    try {
      const id = req.params.id;
      const result =await Job.delete(id);
      if(result === true) {
        res.status(200).json(" job deleted  successfully ")
      }
      else res.json({"mes" : ' Can not delete this job '})

    } catch (error) {
      res.status(404).json('Error !' + error)      
    }

  } 
  static addNewteJob = async(req ,res , next)=>{
    
    try {
      //const JobObj = req.body ;
      const JobObj = new Job(req.body) ;
      JobObj.setTitle( req.body.title)
      JobObj.setJobType( req.body.job_type)
      JobObj.setOwner( req.body.owner)
      JobObj.setSalary( req.body.salary)
      JobObj.setVacancy( req.body.vacancy)
      JobObj.setLocation( req.body.location)
      JobObj.setCategory( req.body.category)
      JobObj.setExperience( req.body.experience)
      JobObj.setImage( req.body.image)
      JobObj.setDeadline(req.body.deadline)
      JobObj.setQualifications(req.body.qualifications)
      JobObj.setResponsibility(req.body.responsibility)
  
      const now = new Date();
      JobObj.setPublishedOn(now.toISOString().split('T')[0])

      const result = await Job.addNew(JobObj);
      if(result === true)   res.status(200).json(" job added  successfully ")
      else res.status(404).json(' Can not add this job')
      
    } catch (error) {
      
      res.status(404).json('Error !'+ error)
      
    }
      
  } 
  static test = async(req ,res , next)=>{
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- VALIDATE THE IMAGE
      if (!req.file) {
        return res.status(400).json({
          errors: [
            {
              msg: "Image is Required",
            },
          ],
        });
      }

      // 3- PREPARE MOVIE OBJECT
    const JobObj = new Job()
    JobObj.setImage(req.file.filename)
    JobObj.setTitle(req.body.name)

      // 4 - INSERT MOVIE INTO DB
     await Job.test(JobObj)
      res.status(200).json({
        msg: "movie created successfully !",
      });
  }
  static updateJob = async(req ,res , next)=>{
    try {
      const id = req.params.id ;
      const oldData= await Job.get(id)
      if(oldData.length == null){
        res.status(201).json("No Job with this id")
      }
      else{
        const JobObj = new Job(req.body) ;
        if(req.body.title == null) JobObj.setTitle( oldData[0].title)
        else JobObj.setTitle( req.body.title)

        if(req.body.job_type ==null){ JobObj.setJobType( oldData[0].job_type)}
        else {JobObj.setJobType( req.body.job_type)}
        
        if( req.body.owner == null){JobObj.setOwner( oldData[0].owner)}
        else {JobObj.setOwner( req.body.owner)}
        
        if(req.body.salary == null){JobObj.setSalary( oldData[0].salary)}
        else{JobObj.setSalary( req.body.salary)}
        
        if(req.body.vacancy==null){JobObj.setVacancy( oldData[0].vacancy)}
        else{JobObj.setVacancy( req.body.vacancy)} 
        
        if(req.body.location==null){ JobObj.setLocation( oldData[0].location)}
        else{ JobObj.setLocation( req.body.location)}
       
        if(req.body.category==null){  JobObj.setCategory( oldData[0].category)}
        else{  JobObj.setCategory( req.body.category)}
      
        if(req.body.experience==null){JobObj.setExperience( oldData[0].experience)}
        else{JobObj.setExperience( req.body.experience)}
        
      
        if(req.body.deadline==null){ JobObj.setDeadline(oldData[0].deadline)}
        else{ JobObj.setDeadline(req.body.deadline)}
       
        if(req.body.qualifications ==null){ JobObj.setQualifications(oldData[0].qualifications)}
        else{ JobObj.setQualifications(req.body.qualifications)}
       
        if(req.body.responsibility==null){JobObj.setResponsibility(oldData[0].responsibility)}
        else{JobObj.setResponsibility(req.body.responsibility)}
        
        if(req.body.published_on==null){ JobObj.setPublishedOn(oldData[0].published_on)}
        else{   JobObj.setPublishedOn(req.body.published_on)}

        const result = await Job.update(id ,JobObj);
        if(result === true)   res.status(200).json(" job Updated  successfully ")
        else res.status(404).json(' Can not update this job')
     
      }
      
      
    } catch (error) {
      res.status(404).json('Error in updateJob :!' + error)     
    }
   
  } 
  //----------------------------- Some Pages ------------------
  static applyForJob = async(req, res , next)=>{
    try {
      
      const {token} = req.headers ;
      const userId = await User.getUserByToken(token)
      

      const isUserExists =await User.isExist(userId[0].id) 
      const isJobExists = await Job.isExist(req.params.id)
      
      if( isJobExists & isUserExists == true)
      {
           const appliedBefore= await Application.appliedBefore(userId[0].id, req.params.id)
           //res.json({appliedBefore})

           if(appliedBefore == true )
           {
             res.status(404).json('You applay for this job before')
           }
           else
           {
            const applicationObj = new Application()    
            const now = new Date();
            applicationObj.setApplaiedOn(now.toISOString().split('T')[0])
            applicationObj.setProtfolio(req.body.protfolio)
            applicationObj.setJobId( req.params.id)
            applicationObj.setUserId(userId[0].id)
      
            const result = await Application.addNew(applicationObj);
            if(result === true)   res.status(200).json(" candidate added  successfully ")
            else res.status(404).json(' Can not add this candidate')
          }
           
      }
      else{
        res.status(404).json("userID or jobID is not exists"+"\n"+ ` userID = ${isUserExists} ,  jobID = ${isJobExists}  `)
      }
      
    } catch (error) {
      res.status(404).json('Error !' + error)
    }

  }
    
}
module.exports ={JobController}