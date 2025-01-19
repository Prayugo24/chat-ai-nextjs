
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faFileCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { IMessage } from "@/pages/Home/HomeComponent";

interface ISidebarComponent {
    isSidebarOpen: boolean;
    messages: IMessage[];
    setIsSidebarOpen: (isOpen : boolean) => void;
    setMessages: (messages: any[]) => void;
    setIsSave: (isSave: boolean) => void;

}

export interface IChatSession {
  id: string;
  messages: IMessage[]; // Perbaiki properti menjadi `messages`
  timestamp: string;
  isSave: boolean;
}
export const SidebarComponents = (
  {isSidebarOpen, messages,setIsSidebarOpen, setMessages, setIsSave} : ISidebarComponent
) => {
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
        messages: messages,
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
    };
  
    const loadChatSession = (sessionId: string) => {
      const session = chatHistory.find((s: IChatSession) => s.id === sessionId);
      if (session) {
        setMessages(session.messages);
        setIsSave(session.isSave)
      }
    };
    const groupedChats = groupChatHistoryByDate(chatHistory);

    return (
      <nav
          className={`chat-sidebar fixed md:relative bg-white border-r border-gray-200 h-full flex flex-col z-50 transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "hidden"
          }`}
        >
          <div className="flex p-4 border-b border-gray-200">
            <Image
              src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
              alt="DeepSeek"
              width={32}
              height={32}
              className="h-8 gap-6"
            />
            <button 
              className="ml-auto" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <FontAwesomeIcon icon={faRightFromBracket} style={{ transform: 'rotate(180deg)' }} />
            </button>
          </div>

          <button 
            onClick={handleNewChat}
            className="m-4 rounded-button flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-2 px-4 hover:bg-blue-200 transition-colors">
            <FontAwesomeIcon icon={faFileCirclePlus} />
            New chat
          </button>
          

          <div className="flex-1 overflow-y-auto px-2">
           {/* Today */}
              {groupedChats.today.length > 0 && (
                <div className="text-sm text-gray-500 px-2 mb-2">Today</div>
              )}
              {groupedChats.today.map((session) => (
                  <div
                  key={session.id}
                  onClick={() => loadChatSession(session.id)}
                  className="hover:bg-gray-100 rounded-lg p-2 mb-2 cursor-pointer flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-800">
                        {session.messages && session.messages[0]?.text || "New Chat"}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChatSession(session.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
              
                  
              ))}

            {/* Yesterday */}
              {groupedChats.yesterday.length > 0 && (
                <div className="text-sm text-gray-500 px-2 mb-2">Yesterday</div>
              )}
              {groupedChats.yesterday.map((session) => (
                <div
                  key={session.id}
                  onClick={() => loadChatSession(session.id)}
                  className="hover:bg-gray-100 rounded-lg p-2 mb-2 cursor-pointer flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-800">
                      {session.messages && session.messages[0]?.text || "New Chat"}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChatSession(session.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}

            {/* 7 Days */}
              {groupedChats.last7Days.length > 0 && (
                <div className="text-sm text-gray-500 px-2 mb-2">7 Days</div>
              )}
              {groupedChats.last7Days.map((session) => (
                <div
                  key={session.id}
                  onClick={() => loadChatSession(session.id)}
                  className="hover:bg-gray-100 rounded-lg p-2 mb-2 cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <div className="text-sm text-gray-800">
                      {session.messages && session.messages[0]?.text || "New Chat"}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChatSession(session.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
          </div>
          <button 
            onClick={deleteAllChatSessions}
            className="m-4 rounded-button flex items-center justify-center gap-2 bg-yellow-600 text-white py-2 px-4 hover:bg-red-600 transition-colors">
            <FontAwesomeIcon icon={faTrash} />
            Delete All History
          </button>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Image
                alt="my profile"
                width={32}
                height={32}
                src="https://lh3.googleusercontent.com/a/ACg8ocIHL2FgNVTPbLbGELimDkVMhr0Y8CRnckgwN_l1Dg9cKNhA2HT8=s96-c"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="font-medium">My Profile</div>
                <div className="text-sm text-gray-500">Personal</div>
              </div>
            </div>
          </div>
        </nav>
    )
}

