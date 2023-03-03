const { request } = require('express');
var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginUserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var searchUserControllerFunc = async (req, res) => {
    var result = null;
    const email = req.params.email;
    try {
        result = await userService.searchUserDBService(email);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } 
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var updateUserControllerFunc = async (req, res) => {
    var result = null;
    const id = req.params;
    try {
        result = await userService.updateUserDBService(req.params.id, req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } 
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var deleteUserControllerFunc = async (req, res) => {
    var result = null;
    const email = req.params;
    try {
        result = await userService.deleteUserDBService(email);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } 
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}


module.exports = { createUserControllerFunc, loginUserControllerFunc, searchUserControllerFunc, updateUserControllerFunc, deleteUserControllerFunc};