const {User} = require('../Models/User')
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class UserController{
  
  static getUser = async (req, res, next) =>{
      const {token} = req.headers ;
      const user = await User.get(token)
      
        if (user.length != 0 ){
         res.status(200).json({user})
        }
        else {
           res.status(404).send(`this user token ${token} Not in the system `)
        }
     

  }
  static addNewUser= async(req, res , next )=>{
     
     if( await User.isEmailExists(req.body.email) === false){
      const userObj =new User();
      //const user = req.body ;
       userObj.setName(req.body.name);
       userObj.setEmail(req.body.email);
       userObj.setAge(req.body.age);
       userObj.setGender(req.body.gender);
       userObj.setAddress(req.body.address);
       userObj.setPhoneNumber(req.body.phone_number);
       userObj.setEducation(req.body.education);
       userObj.setJobTitle(req.body.job_title);
       userObj.setPassword(await bcrypt.hash(req.body.password, 10));
      userObj.setToken(crypto.randomBytes(16).toString("hex"));

            
      const result = await User.addNew(userObj);
      if (result == true) {
         delete userObj.getPassword;
         res.status(200).json('user inserted successfully!')
      } else {
         res.status(404).json('Error inserting users!')
      }

   }
     else{
        res.status(404).json("This user is exist ")

     }
  }
  static delelteUser = async(req, res)=>{
        const {token} = req.headers ;
         const result = await User.delete(token);
         if (result == true) {
            res.status(200).json('user deleted successfully!')
         } else {
            res.status(404).json("Error deleting  user!")
         }
   }
   static updateUser = async(req , res , next )=>{
   
      const { token } = req.headers;
      const oldData = await User.get(token);
      if (oldData.length === 0) {
         return res.status(404).json({ msg: "User not found!" });
      }
      else{
         const newData = new User();
      //name ,email ,gender , address , education , job_title , image , phone_number , age 
         if (req.body.name != null ) {newData.setName(req.body.name); }
         else{newData.setName(oldData[0].name);}

         if (req.body.email  != null) {newData.setEmail(req.body.email);}
         else{ newData.setEmail(oldData[0].email);}

         if (req.body.age != null) {newData.setAge(req.body.age);}
         else{ newData.setAge(oldData[0].age)}

         if (req.body.gender != null) {newData.setGender(req.body.gender);}
         else{ newData.setGender(oldData[0].gender)}

         if (req.body.address  != null) {newData.setAddress(req.body.address);}
         else{ newData.setAddress(oldData[0].address)}

         if (req.body.education  != null) { newData.setEducation(req.body.education);}
         else{ newData.setEducation(oldData[0].education)}

         if (req.body.job_title != null) { newData.setJobTitle(req.body.job_title);}
         else{ newData.setJobTitle(oldData[0].job_title)}

         if (req.body.phone_number != null) {newData.setPhoneNumber(req.body.phone_number);}
         else{ newData.setPhoneNumber(oldData[0].phone_number)}
         
         newData.setToken(token)
      //   // Handle image upload and update user's image field
      //    if (req.file) {
      //       const image = req.file.path; // Get the stored image path
      //       newData.setImage(image);
      //      // Delete old image if a new one was uploaded
      //       if (oldData.image) {
      //       fs.unlinkSync('./uploads/' + oldData.image);
      //       }
      //    } else {
      //       newData.setImage(oldData.image);
      //    }
         const result = await User.update(newData);
         if (result== true) {
         res.status(200).json({ msg: "User updated successfully" });
         } else {
            res.status(404).json({ msg: "Failed to update user" });
         }
         }

  }
  
}
module.exports ={UserController}