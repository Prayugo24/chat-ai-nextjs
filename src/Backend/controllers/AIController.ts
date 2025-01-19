import { NextResponse } from 'next/server';
import { AIServices } from '../services/AIServices';
import _ from "lodash"

export class AIController {

    static async getAiChatMessage(message: string | null) {
        try {
            const servicerespone = new AIServices()
            if(!_.isEmpty(message)){
                const getMessage = await servicerespone.execute(message as string)
                if(!_.isEmpty(getMessage)) {
                    return NextResponse.json({ status: 200, message:"Success Get Message",data:getMessage});
                }
            }
            return NextResponse.json({ status: 400, message:"Bad request",data:''});
            
        } catch (error) {
            console.error('Error get user:', error);
            return NextResponse.json({ status: 500, message: 'Failed to fetch users' });
        }
    }
    
}