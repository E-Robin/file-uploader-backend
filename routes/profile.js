const express = require('express')
const router = express.Router()
const profilesController = require('../controller/profiles');
const storage = require('../helpers/storage');

//controller


//storage

router.get('/images',(req,res)=>{
    res.send("images called")
})
router.get('/',profilesController.getProfiles)
router.get('/:id',profilesController.getById)
router.post('/', storage , profilesController.postProfile)
router.delete('/:id',profilesController.deleteProfiles)
router.patch('/:id',storage,profilesController.updateProfile)

module.exports = router