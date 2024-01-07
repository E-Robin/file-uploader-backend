const  cloudinary = require('../services/cloudinary');
const fs = require('fs');
const Profile = require('../models/profile');



exports.getProfiles = async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({ profiles });
};


exports.getById = async(req,res) => {
  const profile = await Profile.findById(req.params.id)
  res.status(200).json(profile)
}



exports.postProfile = async (req, res) => {

  try{
    // const result = await cloudinary.uploader.upload(req.file.path)
    await cloudinary.uploader.upload(req.file.path)
      .then( async(ress) => {
        console.log(ress)
        const profile = new Profile({
          name: req.body.name,
          imagePath: ress.secure_url,
          cloudinary_id: ress.public_id
        });
        await profile.save()
         res.json({
          profile:{
            ...profile._doc
          }
        })
        // const createdProfile = await profile.save();
        // res.status(201).json({
        //   profile: {
        //     ...createdProfile._doc,
        //   },
        // });

      }).catch((err) => {
        console.log(err)
      })
    
    // const { name } = req.body;
    // const imagePath = result.secure_url;
    // const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
    // const profile = new Profile({
    //   name :req.body.name,
    //   imagePath : result.secure_url,
    //   cloudinary_id: result.public_id
    // });
    // const createdProfile = await profile.save();
    // res.status(201).json({
    //   profile: {
    //     ...createdProfile._doc,
    //   },
    // });
    // await profile.save()
    // res.json({profile:{
    //   profile
    // }})

  }
  catch (err) {
    res.json({ message: err.message })
  }
  
  
};



exports.deleteProfiles = async (req, res) => {
  try {

    let deletedData = await Profile.findById({ _id: req.params.id })
    // const deletedData = await Profile.findByIdAndDelete({_id:req.params.id})
    cloudinary.uploader.destroy(deletedData.cloudinary_id)

    await Profile.findByIdAndDelete({ _id: req.params.id })
    res.json(`${deletedData.name} is deleted`)
  }
  catch (err) {
    res.json({ message: err.message })
  }

}

exports.updateProfile = async( req,res)=>{
  try{

    let updateProfile = await Profile.findById({_id:req.params.id})
    // delete image from cloudinary 
    await  cloudinary.uploader.destroy(updateProfile.cloudinary_id)
//update iamge to cloudinary  
   let newImage = await cloudinary.uploader.upload(req.file.path)

   const updateprofile = {
    name: req.body.name || updateProfile.name,
    imagePath : newImage.secure_url || updateProfile.secure_url,
    cloudinary_id: newImage.public_id || updateProfile.public_id
   }

   const updateUser = await Profile.findByIdAndUpdate(req.params.id,updateprofile)
   res.json({profile:{updateUser}})

  }
  catch(err){
    console.log('err')

  }
}









//>>>>>>>>>>>>>>>>>>>>>>>>>> important
/*
exports.postProfile = async (req, res) => {

  try{
    // const result = await cloudinary.uploader.upload(req.file.path)
    await cloudinary.uploader.upload(req.file.path)
     .then(async(ress)=>{
      console.log(ress)
      const profile = new Profile({
        name :req.body.name,
        imagePath : ress.secure_url,
        cloudinary_id: ress.public_id
      });
      const createdProfile = await profile.save() ;
      res.status(201).json({
        profile: {
          ...createdProfile._doc,
        },
      });

     }).catch((err)=>{
      console.log(err)
     })
    
    // const { name } = req.body;
    // const imagePath = result.secure_url;
    // const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
    // const profile = new Profile({
    //   name :req.body.name,
    //   imagePath : result.secure_url,
    //   cloudinary_id: result.public_id
    // });
    // const createdProfile = await profile.save();
    // res.status(201).json({
    //   profile: {
    //     ...createdProfile._doc,
    //   },
    // });
    // await profile.save()
    // res.json({profile:{
    //   profile
    // }})

  }
  catch (err) {
    res.json({ message: err.message })
  }
  
  
};




*/









// const Profile = require('../models/profile');
// const profile = require('../models/profile');

// exports.getProfiles = async (req, res) => {
//   const profiles = await Profile.find();
//   res.status(200).json({ profiles });
// };

// exports.postProfile = async (req, res) => {

 
//   //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//   const file = req.file.path;

//   const result = await cloudinary.uploader.upload(file)

//   if(result){

//   }
//     console.log(result)
 
//   const { name } = req.body;
//   const imagePath = result.url;
//   // const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
//   const profile = new Profile({
//     name,
//     imagePath,
//   });
//   const createdProfile = await profile.save();
 
// }

// exports.deleteProfiles = async(req,res)=>{

//   try{
        
//     const deletedData = await Profile.findByIdAndDelete({_id:req.params.id})
   
 
//     res.json(`${deletedData.name} is deleted`)
// }
// catch(err){
//     res.json({message:err.message})
// }
//   // const deletedProfile = await Profile.deleteOne({_id:req.params.id})
//   // const deleteProfile = await Profile.findByIdAndRemove({_id:req.params.id})
//   // res.send('item is deleted')
// }

//>>>>>>>>>>>>>>>>>>>

// const { Mongoose } = require('mongoose');
// const Profile = require('../models/profile');
// // const profile = require('../models/profile');

// exports.postProfile = async(req,res)=>{
//     const {name} = req.body;
//     const imagePath = 'http://localhost:3000/images/' + req.file.filename;

//     const profile = new Profile({
//         name,
//         imagePath
//     });
//     const createdProfile = await profile.save();
//     res.status(201).json({
//       profile: {
//         ...createdProfile._doc,
//       }});
      
// }

// exports.getProfiles = async(req,res)=>{
//     const profiles = await Profile.find();
//     res.status(200).json({ profiles });
// }