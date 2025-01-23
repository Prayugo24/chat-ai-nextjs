import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faFileCirclePlus  } from '@fortawesome/free-solid-svg-icons';
import auraChatLogo from "../../assets/images/AuraChatSmallIcon.png"


interface ISidebarMiniComponent {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen : boolean) => void;
}


export const SidebarMiniComponent = (
    {isSidebarOpen, setIsSidebarOpen} : ISidebarMiniComponent
) => {

    return (
        <nav
            className={`fixed md:relative bg-white border-r border-gray-200 h-full flex flex-col z-50 transition-all duration-300 ${
                isSidebarOpen ? "hidden" : "w-16"
            } md:translate-x-0 z-100 -translate-x-full`}
            >
            <div className="flex flex-col space-y-4 p-2">
                <div className="p-2">
                <Image
                    src={auraChatLogo}
                    alt="DeepSeek"
                    className="w-full h-auto"
                />
                </div>
                <div className="p-2">
                <button 
                    className="w-full flex justify-center" 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}>

                    <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
                </div>
                <div className="p-2">
                <button className="w-full flex justify-center">
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                </button>
                </div>
            </div>
        </nav>
    )
}