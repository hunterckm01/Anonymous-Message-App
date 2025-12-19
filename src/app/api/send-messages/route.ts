import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { Message } from "@/model/user.model";

export async function POST(request: Request){
    await dbConnect();

    const {username, content} = await request.json();
    
    try{
        const user = await UserModel.findOne({username});
        if(!user){
            return Response.json({
                success: false,
                message: "User Not Found"
            },{status: 404})
        }

        // Is user accepting the messaages
        // Possible error if any 
        if(!user.isAcceptingMessage){
            return Response.json({
                success: false,
                message: "User is not accepting the messages"
            },{status: 403})
        }

        const newMessage = {content, createdAt: new Date()};
        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json({
            success: true,
            messages: user.messages[0]
            // Possible error if any then try this
            // messages: user.messages[0]
        },{status: 200})
    }
    catch(err){
        console.log("An unexpected error occured");
        return Response.json({
            success: false,
            message: "Something went wrong"
        },{status: 500})
    }
}