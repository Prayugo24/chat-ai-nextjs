import { Client } from '@gradio/client';


export class AIServices {

    async execute(message: string){
        try{
            const client = await Client.connect(process.env.APP_KEY as string);
            const result = await client.predict("/chat", {
              message: message,
            });
            console.log(result)
            return result.data

        }catch(error) {
            console.log("error", error)
            return null
        }
    }
}