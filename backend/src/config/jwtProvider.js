const express = require("express");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECERET_KEY=process.env.SECERET_KEY

const generateToken=(userId)=>{ 
    const token=jwt.sign({userId},SECERET_KEY,{ expiresIn: '48h' })
    return token;
};

const getUserIdFromToken=(token)=>{
   try {
    const decodedToken=jwt.verify(token,SECERET_KEY)
    return decodedToken.userId
   } catch (error) {
    console.error("JWT Verifivation Error", error.message);
    throw new Error("Invalid  Token");
    
   }
};


module.exports={generateToken,getUserIdFromToken};