import { ApiChat } from "@/lib/service";
import { IMessage, ITypingText2 } from "@/pages/Home/HomeComponents";
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
            
            if(!_.isEmpty(messageSystem.data)) {
                setTimeout(() => {
                    startTypingEffect(messageSystem.data);
                    setIsLoading(false); 
    
                }, 10); 
            } else {
                startTypingEffect("Oops... it seems our server is having problems wait a few more moments......")
                setIsLoading(false); 
            }
            

            } catch (error) {
                console.error("Error sending message:", error);
                startTypingEffect("Oops... it seems our server is having problems wait a few more moments......")
                setIsLoading(false);
            }
        }
    };
    
    const startTypingEffect = (text: string) => {
        const segments = extractCodeBlocks(text);
        
        let currentSegment = 0;
        let currentTextIndex = 0;
        
        const processSegment = () => {
          if (currentSegment >= segments.length) {
            setMessages((prevMessages: IMessage[]) => [
              ...prevMessages,
              { text, sender: "system" },
            ]);
            setTypingText("");
            setisDisableTextArea(false);
            return;
          }
      
          const segment = segments[currentSegment];
          
          if (segment.type === 'text') {
            // 2. For text segments: type character by character
            if (currentTextIndex < segment.content.length) {
              setTypingText((prev) => prev + segment.content[currentTextIndex]);
              currentTextIndex++;
              setTimeout(processSegment, 50);
            } else {
              // Move to next segment
              currentSegment++;
              currentTextIndex = 0;
              processSegment();
            }
          } else {
            // 3. For code blocks: add immediately
            const codeBlock = `\`\`\`${segment.language}\n${segment.content}\n\`\`\``;
            setTypingText((prev) => prev + codeBlock);
            
            // Move to next segment
            currentSegment++;
            currentTextIndex = 0;
            processSegment();
          }
        };
      
        // Start processing
        setTypingText(""); // Reset typing text
        processSegment();
    };
    const extractCodeBlocks = (text: string) => {
        const regex = /```(\w+)\s*([\s\S]*?)\s*```/g;
      
        const matches = [];
        let lastIndex = 0;
        let match;
        regex.lastIndex = 0; 
        while ((match = regex.exec(text)) != null) {
          if (match.index > lastIndex) {
            matches.push({
              type: 'text',
              content: text.slice(lastIndex, match.index),
            });
      
          }
      
          matches.push({
            type: 'code',
            language: match[1],
            content: match[2].trim(),
          });
          lastIndex = regex.lastIndex;
        }
      
        if (lastIndex < text.length) {
          matches.push({
            type: 'text',
            content: text.slice(lastIndex),
          });
        }
        
        return matches;
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

    return {toggleSidebar, handleSendMessage, startTypingEffect, handleKeyEnter, handlePaperclipClick, extractCodeBlocks}
}