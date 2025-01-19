import { AIController } from "@/Backend/controllers/AIController";
import { NextRequest } from 'next/server';


export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const message = url.searchParams.get('message');
    return await AIController.getAiChatMessage(message)
}