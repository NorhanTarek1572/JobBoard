const {connectDb} = require("../Config/connect_db")
const util = require("util")
class Application{
    constructor(userID , jobID , cv , protfolio , applaiedOn){
         this.userID =userID, 
         this.jobID =  jobID,
         this.cv  = cv, 
         this.protfolio = protfolio , 
         this.applaiedOn = applaiedOn ;
    }
     //========================= Getters ==================================
   getUserID() {
    return this.userID;
    }
    getJobID () {
        return this.jobID ;
    }
    getCV() {
        return this.cv ;
    }
    getProtfolio() {
        return this.protfolio ;
    }
    getApplaiedOn() {
        return this.applaiedOn ;
    }
    //=================================================== all setters ================================================
    setCV(value) {
        this.cv= value  ;
    }
    
    setProtfolio(value) {
        this.protfolio= value  ;
    }
    setUserId(value){
        this.userID =value
    }
    setJobId(value){
        this.jobID = value
    }
    setApplaiedOn(value) {
        this.applaiedOn = value;
    }
      //=====================================CRUDS Operations on candidates ================================================
  static query = util.promisify(connectDb.query).bind(connectDb);
 
    static async getAll(){
        try {
        const result = await this.query("select * from jobcandidates") 
        if(result.length == 0) {
        return "No data"
        }
        else return result
        

        } catch (error) {
            console.log("Can not get data from DB  :  "+error ) 
        }
        
        
    }
    static async addNew(jobcandidates){
        try {
    
            //pass this id to insert into jobcandidates
            const result  = await this.query("INSERT INTO jobcandidates set ?" , jobcandidates) 
        
        if (result.affectedRows === 1) {
            console.log('jobcandidates inserted successfully!');
            return true ;
        } else {
            console.error('Error inserting jobcandidates!');
            return false ;
        }
        } catch (error) {
            console.log("Can not get data from DB  :  "+error ) 
            
        }
        
        
    }

    // useing the id of the row 
    static async getByID(id){
        try {
            const result = await this.query(`select * from jobcandidates  WHERE  id = ${id} `)
            return result
    } catch (error) {
        console.log("Can not get data from DB getByID :  "+ error ) 
    }
    
    }
    static async deleteByID(id ){
    try {
    
    const result  = await this.query(`DELETE FROM jobcandidates WHERE  id = ${id} ;`) 
        
        if (result.affectedRows === 1) {
            console.log('jobcandidates deleted successfully!');
            return true ;
        } else {
            console.error('Error deleting  jobcandidates!');
            return false ;
        }
    } catch (error) {
        console.log("Can not get data from DB  :  "+error ) 
        
    }
    
    }
    static async updateByID(jobcandidates ,id){
    try {
    
        const result  = await this.query(`UPDATE jobcandidates SET jobID =?,cv =? ,protfolio= ? ,applaiedOn=? WHERE id =?  ;` ,[jobcandidates.jobID , jobcandidates.cv , jobcandidates.protfolio , jobcandidates.applaiedOn , id]) 
            
            if (result.affectedRows === 1) {
                console.log('jobcandidates updated successfully!');
                return true ;
            } else {
                console.error('Error deleting  jobcandidates!');
                return false ;
            }
        } catch (error) {
            console.log("Can not get data from DB  :  "+error ) 
            
        }
    }
    // using (userID AND jobID as a primary key)
    static async get(userId , jobId ){
        try {
            const result = await this.query(`select * from jobcandidates  WHERE  userID = ${userId} && jobID=${jobId} `)
            return result
    } catch (error) {
        console.log("Can not get data from DB  :  "+ error ) 
    }
    
    }
    static async delete(userId , jobId ){
    try {
    
    const result  = await this.query(`DELETE FROM jobcandidates WHERE  userID = ${userId} && jobID=${jobId}  ;`) 
        
        if (result.affectedRows === 1) {
            console.log('jobcandidates deleted successfully!');
            return true ;
        } else {
            console.error('Error deleting  jobcandidates!');
            return false ;
        }
    } catch (error) {
        console.log("Can not get data from DB  :  "+error ) 
        
    }
    
    }
    static async update(jobcandidates){
    try {
    
        // const result  = await this.query(`UPDATE jobcandidates SET jobID =${jobcandidates.jobID},cv =${jobcandidates.cv},protfolio=${jobcandidates.protfolio} ,applaiedOn=${jobcandidates.applaiedOn}  WHERE  userID = ${jobcandidates.userID} && jobID=${jobcandidates.jobID}  ;`) 
        const result  = await this.query(`UPDATE jobcandidates SET = ${jobcandidates}  WHERE  userID = ${jobcandidates.userID} && jobID=${jobcandidates.jobID}  ;`) 
            
            if (result.affectedRows === 1) {
                console.log('jobcandidates updated successfully!');
                return true ;
            } else {
                console.error('Error deleting  jobcandidates!');
                return false ;
            }
        } catch (error) {
            console.log("Can not get data from DB  :  "+error ) 
            
        }
    }

    static async appliedBefore(userId , jobId ){
        try {
            const result = await this.query(`select * from jobcandidates  WHERE   userID= ${userId} && jobID=${jobId} `)
            if( result.length === 0 ) return false ;
            else return true
        } catch (error) {
            console.log("Can not get data from DB  :  "+ error ) 
        }

    }

    static async applicationsInEveryJobs(){
 
        try {
            const result = await this.query("SELECT j.title, c.userID FROM jobCandidates c INNER JOIN jobs j ON j.id = c.jobID;") 
            
            if(result.length != 0) {
                return result
            }
            else return "no candidates for this job"
           } catch (error) {
                console.log("Can not get data from DB :  "+ error ) 
           }
            
      }
      static async applicationsInOneJob(id){
       
        try {
            const result = await this.query("SELECT j.title, c.userID FROM jobCandidates c INNER JOIN jobs j ON j.id = c.jobID where c.id = ? ;",[id]) 
            
            if(result.length != 0) {
                return result
            }
            else return "no candidates for this job"
           } catch (error) {
                console.log("Can not get data from DB :  "+ error ) 
           }
            
      }



 

}

module.exports ={Application}