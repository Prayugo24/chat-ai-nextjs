"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image"
import iconChat from "../../assets/images/iconChat2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarMiniComponent } from '@/components/sidebar/SidebarMiniComponent';
import { SidebarComponents } from '@/components/sidebar/SidebarComponent';
import { faBars  } from '@fortawesome/free-solid-svg-icons';



import "@/styles/ChatMotion.css"
import { ApiChat } from '@/lib/service';
import { SidebarMobileComponents } from '@/components/sidebar/SidebarMobileComponent';
import { useChatBox } from '@/hooks/useChatBox';
import { ChatBoxComponent } from '@/components/chatBox/ChatBoxComponent';
import { DisplayMessageComponent } from '@/components/displayMessage/DisplayMessageComponent';

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
  const [isDisableTextArea, setisDisableTextArea] = useState<boolean>(false);
  const [typingText, setTypingText] = useState<string>(""); // State untuk efek typing
  const [isHiddenMenuMobile, setIsHiddenMenuMobile] = useState(true)
  
  const {
    toggleSidebar, handleSendMessage, startTypingEffect,
    handleKeyEnter, handlePaperclipClick
  } = useChatBox(setMessages, 
      setMessage, setTypingText,setShowPopup, 
      setisDisableTextArea, setIsLoading, setIsSidebarOpen,
      isSidebarOpen,message)


  useEffect(()=> {
    startTypingEffect("Hi! Nice to talk to you. Can I help you? 😄")
  },[])

  
  return (
    <div className="bg-gray-50 h-screen flex overflow-hidden">
         
       {/* Sidebar */}
      <SidebarComponents
        isSidebarOpen={isSidebarOpen} 
        messages={messages}
        setMessages={setMessages}
        setIsSidebarOpen={toggleSidebar}
        setIsSave={setIsSave}
        setIsHiddenMenuMobile={setIsHiddenMenuMobile}
        startTypingEffect={startTypingEffect}
      />

      {/* Sidebar Mini */}
      <SidebarMiniComponent 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={toggleSidebar}/>

      {/* sidebar mobile */}
      <SidebarMobileComponents
        isHiddenMenuMobile={isHiddenMenuMobile} 
        messages={messages}
        setIsSave={setIsSave}
        setMessages={setMessages}
        setIsHiddenMenuMobile={setIsHiddenMenuMobile}
        startTypingEffect={startTypingEffect}
      />


      <DisplayMessageComponent
        isHiddenMenuMobile={isHiddenMenuMobile}
        message={message}
        isLoading={isLoading}
        typingText={typingText}
        isSave={isSave}
        messages={messages}
        isDisableTextArea={isDisableTextArea}
        showPopup={showPopup}
        handleSendMessage={handleSendMessage}
        setIsHiddenMenuMobile={setIsHiddenMenuMobile}
        setMessage={setMessage}
        handlePaperclipClick={handlePaperclipClick}
        handleKeyEnter={handleKeyEnter}
      />
      
    </div>
  );
};
export default HomeComponents;