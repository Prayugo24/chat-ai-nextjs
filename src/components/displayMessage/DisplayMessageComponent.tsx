import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars  } from '@fortawesome/free-solid-svg-icons';
import { IMessage } from '@/pages/Home/HomeComponents';
import Image from "next/image"
import iconChat from "../../assets/images/iconChat2.png"
import { ChatBoxComponent } from '../chatBox/ChatBoxComponent';
import CodeBlockWithBanner from '../codeBlock/CodeBlockWithBanner';
import { useEffect, useRef } from 'react';


export interface IDisplayMessageComponent {
    isHiddenMenuMobile: boolean
    messages: IMessage[]
    isLoading: boolean
    typingText: string
    isSave: boolean
    message: string
    isDisableTextArea: boolean
    showPopup: boolean
    setIsHiddenMenuMobile:(isHiddenMobile:boolean) =>void
    handleSendMessage: () => void
    setMessage: (message:string) => void,
    handlePaperclipClick: () => void
    handleKeyEnter: (e : React.KeyboardEvent<HTMLTextAreaElement>) => void
    extractCodeBlocks:(text: string) => any[]
    
}






export const DisplayMessageComponent = (
    {
        isHiddenMenuMobile, messages,isLoading,
        typingText, isSave, message, isDisableTextArea,
        showPopup, handleSendMessage,setIsHiddenMenuMobile,
        setMessage, handlePaperclipClick, handleKeyEnter, extractCodeBlocks
    }: IDisplayMessageComponent
) => {

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
      scrollToBottom();
  }, [messages, typingText]);
  
    return (
        <main className="flex-1 flex flex-col h-full relative">
          
        <header className="flex p-4  sm:p-6 md:p-4 z-20 justify-between">
          {/* <h1 className="text-lg font-medium"></h1> */}
          <button 
            className={`${!isHiddenMenuMobile ? "hidden":""} md:hidden top-4 left-4 z-50 p-2`}
            onClick={() => setIsHiddenMenuMobile(false)}>
            <FontAwesomeIcon icon={faBars} className="text-gray-700" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-6 w-full px-2 sm:px-4">
            {/* Pesan dari sistem */}
            
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
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
                  } rounded-lg p-4 max-w-[70%] break-words whitespace-pre-wrap`}>
                  {extractCodeBlocks(msg.text).map((part: any, partIndex: any) => (
                    part.type === 'text' ? (
                      <p key={partIndex}>{part.content}</p>
                    ) : (
                    
                      <CodeBlockWithBanner
                        key={partIndex}
                        code={part.content}
                        language={part.language as string}
                        bannerText={part.language as string}
                        bannerColor="bg-gray-600"
                      />
                    )
                  ))}
                  
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
                {extractCodeBlocks(typingText).map((part, partIndex) =>
                  part.type === 'text' ? (
                    <p key={partIndex}>{part.content}</p>
                  ) : (
                    <CodeBlockWithBanner
                      key={partIndex}
                      code={part.content}
                      language={part.language as string}
                      bannerText={part.language as string}
                      bannerColor="bg-gray-600"
                    />
                  )
                )}
                  
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />

          </div>
          
        </div>


        <ChatBoxComponent
          isSave={isSave}
          message={message}
          isDisableTextArea={isDisableTextArea}
          showPopup={showPopup}
          handleSendMessage={handleSendMessage}
          setMessage={setMessage}
          handlePaperclipClick={handlePaperclipClick}
          handleKeyEnter={handleKeyEnter}
        />
        
      </main>
    )
}