
const express = require('express');
let router = express();
const {JobController} = require('../Controller/Job_controller');
const {admin} = require('../Middlware/admin');
const {authorized} = require('../Middlware/authorized');
const upload =require("../Middlware/uploadFiles")

router.get('/' , JobController.getAllJobs) // get all u jobs
router.get('/:id' , JobController.getJob) // get one jobs 
//router.get('/applied_users/:id')


//router.post('/test' ,upload, JobController.test) // get one jobs 

// for users 
router.post('/apply/:id' , authorized ,JobController.applyForJob) // get one jobs 

// for admin 
router.post('/add' , admin , JobController.addNewteJob) // add new job 
router.delete('/delete/:id', admin , JobController.deleteJob) // delete job 
router.put('/update/:id' , admin , JobController.updateJob) // update job 


module.exports = router ;