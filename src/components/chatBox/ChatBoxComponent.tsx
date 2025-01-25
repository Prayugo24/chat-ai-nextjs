import { faArrowCircleUp, faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export interface IChatBoxComponent {
    isSave: boolean
    message: string
    isDisableTextArea: boolean,
    showPopup: boolean,
    handleSendMessage: () => void
    setMessage:(message: string) => void
    handlePaperclipClick: () => void
    handleKeyEnter: (e : React.KeyboardEvent<HTMLTextAreaElement>) => void
}

export const ChatBoxComponent = (
    {
        isSave, message, isDisableTextArea,showPopup,
        handleSendMessage, setMessage, handlePaperclipClick,
        handleKeyEnter
    }: IChatBoxComponent
) =>{

    
    return (
        <div className={`p-4 ${isSave ? "hidden":""}`}>
          <div className="max-w-3xl mx-auto w-full px-2 sm:px-4">
              
            <div className="relative">
              <textarea
                rows={2}
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyDown={handleKeyEnter}
                disabled={isDisableTextArea} 
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
    )
}