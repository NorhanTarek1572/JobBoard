const express = require('express');
let router = express();
const {admin} = require('../Middlware/admin');
const {ApplicationController} = require('../Controller/Application_controller');
const { authorized } = require('../Middlware/authorized');

router.get('/'  , ApplicationController.getAllApplication) // get all u Application
router.get('/:id' ,authorized , ApplicationController.getApplication)  // get your application 
router.put('/update/:id',authorized , ApplicationController.updateApplication ) // update Application 
router.delete('/delete/:id',authorized , ApplicationController.deleteApplication ) // delete Application 


// router.get('/getCandidatesInEveryJobs'  ,admin , ApplicationController.getCandidatesInEveryJobs) 
// router.get('/getCandidatesInOneJob/:id'  , admin ,ApplicationController.getCandidatesInOneJob) 



module.exports = router ;
