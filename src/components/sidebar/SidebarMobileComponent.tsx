import Image from "next/image"
import auraChatLogo from "../../assets/images/AuraChat.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faFileCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ISidebarComponent } from "./SidebarComponent";
import { useSideBar } from "@/hooks/useSidebar";
import { useState } from "react";
import { IMessage } from "@/pages/Home/HomeComponents";
import { HistoryComponents } from "./HistoryComponent";
import { ProfileComponent } from "./ProfileComponent";

export interface ISidebarMobileComponent {
    isHiddenMenuMobile: boolean;
    messages: IMessage[];
    setMessages: (messages: IMessage[]) => void;
    setIsSave: (isSave: boolean) => void;
    setIsHiddenMenuMobile:(isOpen : boolean) => void;
    startTypingEffect:(message: string) => void
}


export const SidebarMobileComponents = (
    {isHiddenMenuMobile, messages ,setIsHiddenMenuMobile, setMessages, setIsSave, startTypingEffect} : ISidebarMobileComponent
) =>{
    
    
    const { 
      handleNewChat,
      deleteAllChatSessions, 
      deleteChatSession, 
      groupedChats, 
      loadChatSession
    } = useSideBar(messages, setMessages, setIsSave, setIsHiddenMenuMobile, startTypingEffect)
    

    return (
        <div 
        className={`
        fixed bg-white border-r border-gray-200 h-full w-[90%] flex-col z-10 
        transition-all duration-500 ease-in-out 
        ${isHiddenMenuMobile ? "-translate-x-full" : "translate-x-0"}`}>
            <div className="flex p-4 border-b border-gray-200">
                <Image
                    src={auraChatLogo}
                    alt="DeepSeek"
                    className="w-[250px] h-auto gap-6"
                />
                <button 
                    className="ml-auto" 
                    onClick= {() => setIsHiddenMenuMobile(true)}
                >
                <FontAwesomeIcon icon={faRightFromBracket} style={{ transform: 'rotate(180deg)' }} />
                </button>
            </div>
            <button 
                onClick={handleNewChat}
                className="m-5 rounded-button flex items-center w-[87%]
                justify-center gap-2 bg-blue-100 text-blue-700 py-2 
                px-4 hover:bg-blue-200 transition-colors">
                <FontAwesomeIcon icon={faFileCirclePlus} />
                New chat
            </button>

            <HistoryComponents 
                loadChatSession={loadChatSession}
                deleteChatSession={deleteChatSession}
                groupedChats={groupedChats}
            />

            <div className="absolute bottom-0 left-0 right-0">
                <button
                    onClick={deleteAllChatSessions}
                    className="m-5 rounded-button flex items-center w-[87%] 
                    justify-center gap-2 bg-yellow-600 text-white py-2 px-4
                     hover:bg-red-600 transition-colors"
                >
                <FontAwesomeIcon icon={faTrash} />
                Delete All History
                </button>

                <div className="p-4 border-t border-gray-200 items-baseline bg-white">
                    <ProfileComponent/>
                </div>
            </div>

        </div>
    )
}