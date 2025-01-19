"use client"
import React, { useState } from 'react';
import Image from "next/image"
import iconChat from "../../assets/images/iconChat.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarMiniComponent } from '@/components/sidebar/SidebarMiniComponent';
import { SidebarComponents } from '@/components/sidebar/SidebarComponent';
import { faPaperclip,faArrowCircleUp  } from '@fortawesome/free-solid-svg-icons';



import "@/styles/ChatMotion.css"
import { ApiChat } from '@/lib/service';

export interface IMessage {
  text: string;
  sender: 'user' | 'system';
}

const HomeComponents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [message, setMessage] = useState<string>(''); 
  const [messages, setMessages] = useState<IMessage[]>([]); 
  const [isSave, setIsSave] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typingText, setTypingText] = useState<string>(""); // State untuk efek typing

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSendMessage = async() => {
    if (message.trim()) {
      try{
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message, sender: 'user' },
        ]);
        setMessage('');
        setIsLoading(true)
        const messageSystem = await ApiChat.getMessage(message)

        console.log(messageSystem)

        setTimeout(() => {
          startTypingEffect(messageSystem.data[0]);
          setIsLoading(false); 

        }, 10); 

      } catch (error) {
        console.error("Error sending message:", error);
        setIsLoading(false);
      }
    }
  };
  const startTypingEffect = (text: string) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingText((prev) => prev + text[index]); 
        index++;
      } else {
        clearInterval(interval); 
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: text, sender: "system" },
        ]);
        setTypingText("");
      }
    }, 50); 
  };
  const handleKeyEnter = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSendMessage();
    }
  }
  const handlePaperclipClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); 
  };

  return (
    <div className="bg-gray-50 h-screen flex overflow-hidden">
         
       {/* Sidebar */}
      <SidebarComponents
        isSidebarOpen={isSidebarOpen} 
        messages={messages}
        setMessages={setMessages}
        setIsSidebarOpen={toggleSidebar}
        setIsSave={setIsSave}
      />

      {/* Sidebar Mini */}
      <SidebarMiniComponent 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={toggleSidebar}/>


      <main className="flex-1 flex flex-col h-full relative">
        <header className="p-4 border-b border-gray-200 shadow-md sm:p-6 md:p-8 z-20">
          <h1 className="text-lg font-medium">Greeting and Offer of Assistance</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-6 w-full px-2 sm:px-4">
            {/* Pesan dari sistem */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-4 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'system' && (
                  <Image
                    alt='system icon'
                    width={32}
                    height={32}
                    src={iconChat}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                )}
                <div
                  className={`message-bubble ${
                    msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                  } rounded-lg p-4 max-w-[70%] break-words whitespace-pre-wrap`}
                >
                  {msg.sender === 'system' ? (
                    <div>
                      <p>{msg.text}</p>
                    </div>
                  ) : (
                    <p>{msg.text}</p>
                    
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <Image
                  alt="system icon"
                  width={32}
                  height={32}
                  src={iconChat}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="bg-gray-100 text-gray-800 rounded-lg p-4 max-w-[70%]">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {typingText && (
              <div className="flex gap-4 justify-start">
                <Image
                  alt="system icon"
                  width={32}
                  height={32}
                  src={iconChat}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="bg-gray-100 text-gray-800 rounded-lg p-4 max-w-[70%] break-words whitespace-pre-wrap">
                  <p>{typingText}</p>
                </div>
              </div>
            )}
          </div>
          
        </div>


        <div className={`p-4 ${isSave ? "hidden":""}`}>
          <div className="max-w-3xl mx-auto w-full px-2 sm:px-4">
              
            <div className="relative">
              <textarea
                rows={2}
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyDown={handleKeyEnter}
                placeholder="Please Enter your message"
                className="w-full pr-24 pl-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ></textarea>
              <div className="absolute right-2 bottom-2 flex items-center gap-1 sm:gap-2 flex-wrap">
              {showPopup && (
                 <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg z-50 w-max max-w-[90vw] sm:max-w-none sm:p-3 animate-fade-in">
                 <p className="text-sm text-gray-800">This Feature Is Not Available Yet.</p>
               </div>
              )}
                <button 
                  onClick={handlePaperclipClick}
                  className="text-gray-400 hover:text-gray-600">
                  <FontAwesomeIcon 
                    className="w-[20px] h-[20px]"
                  icon={faPaperclip}/>
                </button>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={handleSendMessage} >
                  <FontAwesomeIcon
                   className="w-[30px] h-[30px]"
                   icon={faArrowCircleUp}/>
                </button>
                
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2 text-center">
              AI-generated, for reference only
            </div>
          </div>
        </div>
        
      </main>
      
    </div>
  );
};
export default HomeComponents;