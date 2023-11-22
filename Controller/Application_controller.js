
 const {Application} = require('../Models/Application')
 const {User} = require('../Models/User')
 const {Job} = require('../Models/Job')
 class ApplicationController{

 
    static  getAllApplication = async(req, res , next)=>{
      try {
          // get all candidates for this job
         
           const result = await Application.getAll();
           if( result.length != 0)   res.status(200).json(result)
           else res.status(204).json('Thiere is no candidates ')
               
        
      } catch (error) {
          res.status(404).json('Error !' + error)
          
      }
       
      
   }
    static addNewApplication = async(req, res , next)=>{
        try {   

         const isUserExists =await User.isExist(req.body.userID) 
         const isJobExists = await Job.isExist(req.body.jobID)
         
         if(isJobExists & isUserExists == true) {
              const appliedBefore= await Application.appliedBefore(req.body.userID , req.body.jobID)
              if(appliedBefore == true ){
                res.status(204).json('this user applay for this job before')
              }
              else{
                const candidateObj = new Application()    
                const now = new Date();
                candidateObj.setApplaiedOn(now.toISOString().split('T')[0])
                candidateObj.setProtfolio(req.body.protfolio)
                candidateObj.setJobId( req.body.jobID)
                candidateObj.setUserId(req.body.userID)
              const result = await Application.addNew(candidateObj);
                if(result === true)   res.status(201).json(" candidate added  successfully ")
                else res.status(204).json(' Can not add this candidate')
              }
         }
         else{
              res.status(204).json(`userID${isUserExists} or jobID${isJobExists} is not exists ` )
         }
       
        } catch (error) {
          res.status(404).json('Error !' + error)
        }
    
    }
    static deleteApplication = async(req , res, next)=>{
        try {
           // const result =await Application.delete(req.body.userID , req.body.jobID) ;
           const result =await Application.deleteByID(req.params.id) ;
            if(result === true) {
              res.status(200).json(" Application deleted  successfully ")
          }
          else res.json({"mes" : ' Can not delete this Application '})


        } catch (error) {
            res.status(404).json('Error !' + error)
            
        }
  }
    static  getApplication= async(req, res , next)=>{
      // get One  for this job
        try {
           const result = await Application.getByID(req.params.id);
           if( result.length != 0 ) res.status(200).json({result})
           else res.status(404).json("Thire is No data to get ")

        } catch (error) {
            res.status(404).json('Error !' + error)
            
        }
       
  }
     static updateApplication =async(req,res,next)=>{
      try {

        const isUserExists =await User.isExist(req.body.userID) 
        const isJobExists = await Job.isExist(req.body.jobID)
        
        if(isJobExists & isUserExists === true) {
          const appliedBefore= await Application.appliedBefore(req.body.userID , req.body.jobID)
          
          if(appliedBefore == true ){
               res.status(404).json('this user applay for this job before')
          }
          else{
              const candidateObj = new Application()               
              candidateObj.setProtfolio(req.body.protfolio)
              candidateObj.setJobId(req.body.jobID )
              candidateObj.setUserId(req.body.userID )
              
              //candidateObj.setCV(req.file.cv)
            
        
              const result = await Application.updateByID(candidateObj , req.params.id)
              if(result === true)   res.status(200).json(" candidate updated  successfully ")
              else res.status(404).json(' Can not update this candidate')
          }
          
        }
        else{
          res.status(404).json("userID or jobID is not exists ")
         }

        } catch (error) {
          res.status(404).json('Error !' + error)
        }
  } 
  static getApplicationsInOneJob = async(req, res , next)=>{
    try {

      const result = await Application.applicationsInOneJob(req.params.id)
      if( result.length != 0 ){
        res.status(200).json(result)
      }
      else{
        res.status(404).json("error in allJobsInOneCategory ")
      }
      
    } catch (error) {
      res.status(404).json(error)
      
    }

  }
  static getApplicationsInEveryJobs = async(req, res , next)=>{
    try {
      const result = await Application.applicationsInEveryJobs()
      if( result.length != 0 ){
        res.status(200).json(result)
      }
      else{
        res.status(404).json("error in allJobsInOneCategory ")
      }
      
    } catch (error) {
      res.status(404).json(error)
      
    }

  }
 



 }
 module.exports ={ApplicationController}