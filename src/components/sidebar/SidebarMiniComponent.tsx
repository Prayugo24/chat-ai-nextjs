import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faFileCirclePlus  } from '@fortawesome/free-solid-svg-icons';

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
            }`}
            >
            <div className="flex flex-col space-y-4 p-2">
                <div className="p-2">
                <Image
                    src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
                    alt="DeepSeek"
                    width={32}
                    height={32}
                    className="w-8 h-8"
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