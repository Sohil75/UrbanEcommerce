const express = require("express");
const jwtProvider=require("../config/jwtProvider")
const userService=require("../services/user.service")


const authenticate = async(req,res,next)=>{

    try {
        const token=req.headers.authorization?.split(" ")[1]
        console.log("Received Token: ", token);
        if(!token){
            return req.status(404).send({message:"token not found"})
        }

        const userId=jwtProvider.getUserIdFromToken(token);
        const user=await userService.findUserById(userId);

        req.user=user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(500).send({error:error.message})
    }
   
}

module.exports=authenticate;