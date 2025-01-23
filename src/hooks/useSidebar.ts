import { IMessage } from "@/pages/Home/HomeComponents";
import { useEffect, useState } from 'react';


interface IChatSession {
  id: string;
  messages: IMessage[]; 
  timestamp: string;
  isSave: boolean;
}


export const useSideBar = (
    message: IMessage[],
    setMessages: (messages: IMessage[]) => void,
    setIsSave: (isSave: boolean) => void,
    setIsHiddenMenuMobile:(isOpen : boolean) => void
) =>{
    const [chatHistory, setChatHistory] = useState<IChatSession[]>([]);
    
    useEffect(() => {
        const savedChatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        const validChatHistory = savedChatHistory.filter((session: IChatSession) => 
            session.id && session.messages && Array.isArray(session.messages) && session.timestamp
        );
    
        setChatHistory(validChatHistory);
    }, []);
    const groupChatHistoryByDate = (chatHistory: IChatSession[]) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
    
        const groupedChats = {
            today: [] as IChatSession[],
            yesterday: [] as IChatSession[],
            last7Days: [] as IChatSession[],
        };
    
        chatHistory.forEach((session) => {
            const sessionDate = new Date(Number(session.id)); 
        
            if (sessionDate.toDateString() === today.toDateString()) {
                groupedChats.today.push(session);
            } else if (sessionDate.toDateString() === yesterday.toDateString()) {
                groupedChats.yesterday.push(session);
            } else if (sessionDate > new Date(today.setDate(today.getDate() - 7))) {
                groupedChats.last7Days.push(session);
            }
        });
    
        return groupedChats;
    };
    const deleteChatSession = (sessionId: string) => {
        const savedChatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        const updatedChatHistory = savedChatHistory.filter((session: IChatSession) => session.id !== sessionId);
        localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
        setChatHistory(updatedChatHistory);
    };
    const deleteAllChatSessions = () => {
        localStorage.removeItem('chatHistory');
        setChatHistory([]);
    };
    
    const handleNewChat = () => {
        const sessionId = Date.now().toString();
        const newSession: IChatSession = {
            id: sessionId,
            messages: message,
            timestamp: new Date().toLocaleString(),
            isSave: true
        };
        const savedChatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        const updatedChatHistory = [...savedChatHistory, newSession];
        const sortedChatHistory = updatedChatHistory.sort((a, b) => Number(b.id) - Number(a.id));
        localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
        setChatHistory(sortedChatHistory);
        setMessages([]);
        setIsSave(false)
        setIsHiddenMenuMobile(true)
    };
    
    const loadChatSession = (sessionId: string) => {
        const session = chatHistory.find((s: IChatSession) => s.id === sessionId);
        if (session) {
            setMessages(session.messages);
            setIsSave(session.isSave)
            setIsHiddenMenuMobile(true)
            
        }
    };
    const groupedChats = groupChatHistoryByDate(chatHistory);

    return {groupedChats, deleteChatSession, deleteAllChatSessions, handleNewChat, loadChatSession}
}