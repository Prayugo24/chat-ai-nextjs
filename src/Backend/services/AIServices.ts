import { Client } from '@gradio/client';


export class AIServices {

    async execute(message: string){
        try{
            const client = await Client.connect(process.env.APP_KEY as string);
            const result = await client.predict("/chat", {
              message: message,
            });
            
            const apiResponse: string = result.data as string;
            
            const cleanedText: string = apiResponse[0].replace(/<think>[\s\S]*?<\/think>\n*/g, '').trim();
            console.log("apiResponse",apiResponse)
            return cleanedText.trim()
            
        }catch(error) {
            console.log("error", error)
            return null
        }
    }
}