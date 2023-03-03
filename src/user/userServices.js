var userModel = require("./userModel");
var key = "somekey234567884456753456";
var encryptor = require("simple-encryptor")(key);

module.exports.createUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      var userModelData = new userModel();

      userModelData.firstname = userDetails.firstname;
      userModelData.lastname = userDetails.lastname;
      userModelData.email = userDetails.email;
      userModelData.password = userDetails.password;
      var encrypted = encryptor.encrypt(userDetails.password);
      userModelData.password = encrypted;

      userModelData.save(function resultHandle(error, result) {
         if (error) {
            reject(false);
         } else {
            resolve(true);
         }
      });
   });
};

module.exports.loginUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne(
         { email: userDetails.email },
         function getresult(errorvalue, result) {
            if (errorvalue) {
               reject({ status: false, msg: "Datos Invalidos" });
            } else {
               if (result != undefined && result != null) {
            var decrypted = encryptor.decrypt(result.password);

            if (decrypted == userDetails.password) {
               resolve({ status: true, msg: "Usuario Validado" });
            } else {
               reject({ status: false, msg: "Falla en validacion de usuario" });
            }
            } else {
               reject({ status: false, msg: "Detalles de usuario invalido" });
            }
            }
         }
      );
   });
};

module.exports.searchUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({email: userDetails}, function getResult(errorvalue, result ){
         if (errorvalue) {
            reject({status: false, msg: "Usuario No Encontrado"});
         }
         else{
            if (result!==null && result.email===userDetails) {
               resolve({status: true, msg: result})
            }
            reject({status: false, msg:"Usuario No Encontrado"});
         }
      })
   })
}

module.exports.updateUserDBService = (id,userDetails) => {
   userDetails.password = encryptor.encrypt(userDetails.password);

   return new Promise(function(resolve, reject) {
      userModel.findOneAndUpdate({_id:id}, userDetails, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({status: false, msg: "datos invalidos"});
         } else{
            resolve({status: true, msg: "usuario actualizado", usuarios:result})
         }
      })
   });
}

module.exports.deleteUserDBService = ( userDetails ) =>{
   return new Promise( 
      ( resolve, reject ) => {
         userModel.findOneAndDelete(  { email: userDetails.email } , (errorvalue, result)=>{
            if(errorvalue) {
               reject({status: false, msg: "Datos Invalidos"});
            } else {
               if(result !=undefined &&  result !=null) {
                  if(result.email == userDetails.email) {
                     resolve({status: true,msg: `Usuario ${userDetails.email} eliminado`});
                  }
                  else {
                     reject({status: false,msg: "Usuario no encontrado"});
                  }
               }
               else {
                  reject({status: false,msg: "Usuario no existente"});
               }
            }
         });
   })   
}