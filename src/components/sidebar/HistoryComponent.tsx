import { IChatSession, useSideBar } from "@/hooks/useSidebar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISidebarComponent } from "./SidebarComponent";
import { IMessage } from "@/pages/Home/HomeComponents";

export interface IHistoryComponents {
    loadChatSession:(sessionId: string) =>void,
    deleteChatSession:(sessionId: string) => void
    groupedChats:any
}

export const HistoryComponents = (
    {
        loadChatSession,deleteChatSession,
        groupedChats
    } : IHistoryComponents
) => {
    
    return (
        <div className="flex-1 overflow-y-auto px-2">
        {/* Today */}
            {groupedChats.today.length > 0 && (
            <div className="text-sm text-gray-500 px-2 mb-2">Today</div>
            )}
            {groupedChats.today.map((session:any) => (
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
            {groupedChats.yesterday.map((session:any) => (
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
            {groupedChats.last7Days.map((session:any) => (
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
    )
}