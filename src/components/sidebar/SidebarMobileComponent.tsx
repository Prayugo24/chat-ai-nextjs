import Image from "next/image"
import auraChatLogo from "../../assets/images/AuraChat.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faFileCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ISidebarComponent } from "./SidebarComponent";
import { useSideBar } from "@/hooks/useSidebar";
import { useState } from "react";
import { IMessage } from "@/pages/Home/HomeComponents";

export interface ISidebarMobileComponent {
    isHiddenMenuMobile: boolean;
    messages: IMessage[];
    setMessages: (messages: IMessage[]) => void;
    setIsSave: (isSave: boolean) => void;
    setIsHiddenMenuMobile:(isOpen : boolean) => void;

}


export const SidebarMobileComponents = (
    {isHiddenMenuMobile, messages ,setIsHiddenMenuMobile, setMessages, setIsSave} : ISidebarMobileComponent
) =>{
    
    
    const { 
      handleNewChat,
      deleteAllChatSessions, 
      deleteChatSession, 
      groupedChats, 
      loadChatSession
    } = useSideBar(messages, setMessages, setIsSave, setIsHiddenMenuMobile)
    
    console.log("slider",isHiddenMenuMobile)

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
                <div className="flex items-center gap-3">
                    <Image
                    alt="my profile"
                    width={32}
                    height={32}
                    src="https://lh3.googleusercontent.com/a/ACg8ocIHL2FgNVTPbLbGELimDkVMhr0Y8CRnckgwN_l1Dg9cKNhA2HT8=s96-c"
                    className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                    <div className="font-medium">By Developers</div>
                    <div className="text-sm text-gray-500">Personal</div>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}