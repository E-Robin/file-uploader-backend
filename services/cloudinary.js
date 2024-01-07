const   cloudinary = require( 'cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'ds7yweb60', 
  api_key: '919321638868114', 
  api_secret: 'TzsiN8o9RbBSr_40ppT0jmO_Nug' 
});

// uploadToCloudinary = (path,folder)=>  {
// return cloudinary.v2.uploader.upload(path,{
//     folder
// }).then((data)=>{
//     return { url:data.url , public_id : data.public_id }
// } )
// .catch((error)=>{
//     console.log(error)
// })
// }

// removeFromCloudinary = async(public_id) => {
//     await cloudinary.v2.uploader.destroy(public_id,function(error,result){
//         console.log(result,error)
//     })
// }

// module.exports = { uploadToCloudinary, removeFromCloudinary}
module.exports = cloudinary;
// exports.uploads = (file,folder)=>{
//   return new Promise(resolve =>{
//     cloudinary.uploader.upload(file,(result)=>{
//       resolve({
//         url:result.url,
//         id:result.public_id
//       })
//     },{
//       resource_type:"auto",
//       folder:cars
//     })
//   })
// }




// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });