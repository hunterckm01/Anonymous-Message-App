import { resend } from "@/lib/resesnd";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string, 
    verifyCode: string
):Promise<ApiResponse>{
    try{
        // console.log(email, username, verifyCode);
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Anonymous Message | Verification Code',
            react: VerificationEmail({username, 
              otp:verifyCode
             })
        })

        return ({
            success: true,
            message: "Email Sent Successfully"
        })

    }   
    catch(err){
        console.error("Error Sending Verification Email");
        return {
            success: false,
            message: 'Failed to send verification email'
        }
    }
}