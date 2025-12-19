import { streamText, UIMessage, convertToModelMessages, APICallError, generateText } from 'ai';
import { groq } from "@ai-sdk/groq";

// The api key could have expired on 25/12/2025
export async function POST(req: Request) {
    try{
        // const { messages }: { messages: UIMessage[] } = await req.json();
        // const {question} = await req.json();
        const result = await streamText({
          model: groq("llama-3.1-8b-instant"),
          prompt: "Create a list of five open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hooby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'.Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
          //   prompt: `${question}`
        });
        
        // return new Response(result.text, {
        //     headers: {"Content-Type": "text/plain"}
        // })
        return result.toUIMessageStreamResponse();
    }
    catch(err){
        if(APICallError.isInstance(err)){

        }
        else{
            console.error("Unexpected error of connecting openai");
            throw err;
        }
    }
}