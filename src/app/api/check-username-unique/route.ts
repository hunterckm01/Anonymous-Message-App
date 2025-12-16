import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import z from "zod";
import { usernameValidation } from "@/schemas/signup.schema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    await dbConnect();
    try{
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }

        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log(result);
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(', ') : "Invalid Query Parameter"
            },
            {status: 400})
        }

        const {username} = result.data;
        
        const existingVerfiedUser = await UserModel.findOne({username, isVerified: true});

        if(existingVerfiedUser){
            return Response.json({
                success: false,
                message: "Username is already taken"
            },{status: 400})
        }

        return Response.json({
            success: true,
            message: "Username is Accpeted"
        }, {status: 201})
    }
    catch(err){
        console.error('Error checking in username', err);
        return Response.json({
            success: false,
            message: "Error Checking username"
        },
        {status: 500}
    )
    }
}