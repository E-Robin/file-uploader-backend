const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name:{type:String},
    imagePath:{type:String},
    cloudinary_id:{type:String}
    
})

module.exports = mongoose.model('Profile',profileSchema)