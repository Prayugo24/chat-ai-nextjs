import { ApiChat } from "@/lib/service";
import { IMessage } from "@/pages/Home/HomeComponents";
import _ from "lodash";


export const useChatBox = (
    setMessages: (messages: IMessage[] | ((prevMessages: IMessage[]) => IMessage[])) => void,
    setMessage: (message:string) => void,
    setTypingText:(messages: string | ((prev: string) => string)) => void,
    setShowPopup:(showPopup: boolean) => void,
    setisDisableTextArea:(isDisableTextArea: boolean) => void,
    setIsLoading:(isLoading: boolean) => void,
    setIsSidebarOpen:(isSidebarOpen: boolean) => void,
    isSidebarOpen: boolean,
    message:string
) => {

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
      
    
    const handleSendMessage = async() => {
        if (message.trim()) {
            try{
            setMessages((prevMessages: IMessage[]) => [
                ...prevMessages,
                { text: message, sender: 'user' },
            ]);
            setisDisableTextArea(true)
            setMessage('');
            setIsLoading(true)
            const messageSystem = await ApiChat.getMessage(message)
            if(!_.isEmpty(messageSystem.data[0])) {
                setTimeout(() => {
                    startTypingEffect(messageSystem.data[0]);
                    setIsLoading(false); 
    
                }, 10); 
            } else {
                startTypingEffect("Oops... it seems our server is having problems wait a few more moments......")
                setIsLoading(false); 
            }
            

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
                setTypingText((prev: string) => prev + text[index]); 
                index++;
            } else {
                clearInterval(interval); 
                setMessages((prevMessages: IMessage[]) => [
                    ...prevMessages,
                    { text: text, sender: "system" },
                ]);
                setTypingText("");
                setisDisableTextArea(false)
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

    return {toggleSidebar, handleSendMessage, startTypingEffect, handleKeyEnter, handlePaperclipClick}
}