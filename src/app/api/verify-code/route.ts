import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import z from "zod";
import { usernameValidation } from "@/schemas/signup.schema";

export async function POST(request: Request){
    await dbConnect();
    try{
        const {username, code} = await request.json();
        const decodedUsername = decodeURIComponent(username);

        await UserModel.findOne({username: decodedUsername});
        const user = await UserModel.findOne({username: decodedUsername});

        if(!user){
            return Response.json({
                message: "Username not found"
            },{status: 500})
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();
        console.log(user.verifyCode);
        console.log(code);

        if(isCodeValid && isCodeExpired){
            user.isVerified = true;
            await user.save();

            return Response.json({
                success: true,
                message: "Account Verified Successfully"
            },{status: 200})
        }
        else if(!isCodeExpired){
            return Response.json({
                success: true,
                message: "Verification Code has Expired, Please Signup Again"
            },{status: 400})
        }
        else{
            return Response.json({
                success: false,
                message: "Incorrect Verification Code"
            },{status: 404})
        }
    }
    catch(err){
        console.error('Error Verifying User', err);
        return Response.json({
            success: false,
            message: "Error Checking Username"
        },{status: 500})
    }
}