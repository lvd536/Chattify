import { sendTextMessage as sendChatTextMessage } from "@/utils/chat";
import { useState } from "react";
import ImageUploadModal from "../Image/ImageUploadModal";
import { sendTextMessage as sendGroupTextMessage } from "@/utils/group";

interface IProps {
    chatId: string;
    uid: string;
    setIsAudio: () => void;
    chatType: "chat" | "group";
}

export default function MessageInput({
    chatId,
    uid,
    setIsAudio,
    chatType,
}: IProps) {
    const [message, setMessage] = useState<string>("");
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
    const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim()) {
            if (chatType === "chat") sendChatTextMessage(chatId, uid, message);
            else sendGroupTextMessage(chatId, uid, message);
            setMessage("");
        }
    };
    return (
        <>
            <form
                action=""
                className="relative flex gap-2 items-center justify-between mb-2"
                onSubmit={handleMessageSubmit}
            >
                <button
                    type="button"
                    onClick={setIsAudio}
                    className="p-2 bg-message-bg rounded-sm mr-1"
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-icons"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </g>
                    </svg>
                </button>
                <button
                    type="button"
                    className="absolute top-0 bottom-0 left-16"
                >
                    <svg
                        height="20"
                        width="20"
                        version="1.1"
                        id="_x32_"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        className="fill-icons"
                        onClick={() => {
                            setIsImageModalOpen(true);
                        }}
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path d="M454.821,253.582L273.256,435.14c-11.697,11.697-25.124,20.411-39.484,26.235 c-21.529,8.729-45.165,10.928-67.755,6.55c-22.597-4.378-44.054-15.25-61.597-32.784c-11.69-11.69-20.396-25.118-26.227-39.484 c-8.729-21.529-10.929-45.165-6.55-67.748c4.386-22.597,15.25-44.055,32.778-61.596l203.13-203.13 c7.141-7.134,15.299-12.43,24.035-15.969c13.1-5.318,27.516-6.656,41.263-3.994c13.769,2.677,26.798,9.27,37.498,19.963 c7.133,7.134,12.423,15.292,15.968,24.035c5.318,13.092,6.657,27.502,3.987,41.264c-2.67,13.762-9.262,26.783-19.955,37.498 L213.261,363.064c-2.534,2.528-5.375,4.364-8.436,5.61c-4.571,1.851-9.661,2.335-14.495,1.396 c-4.848-0.954-9.355-3.225-13.15-7.006c-2.534-2.534-4.364-5.368-5.603-8.429c-1.865-4.571-2.342-9.668-1.402-14.495 c0.947-4.841,3.225-9.355,7.005-13.149l175.521-175.528l-29.616-29.617l-175.528,175.52c-6.536,6.536-11.505,14.182-14.801,22.313 c-4.941,12.195-6.166,25.473-3.702,38.202c2.449,12.73,8.686,24.989,18.503,34.799c6.543,6.55,14.182,11.519,22.305,14.809 c12.202,4.948,25.473,6.165,38.21,3.702c12.722-2.449,24.989-8.678,34.806-18.511L439.97,195.602 c11.142-11.149,19.571-24.113,25.167-37.917c8.394-20.717,10.48-43.314,6.294-64.971c-4.179-21.643-14.73-42.432-31.46-59.155 c-11.149-11.142-24.114-19.571-37.918-25.166c-20.717-8.401-43.314-10.48-64.971-6.301c-21.643,4.186-42.431,14.737-59.155,31.468 L74.803,236.695c-15.713,15.691-27.552,33.931-35.426,53.352c-11.817,29.154-14.765,60.97-8.863,91.462 c5.888,30.478,20.717,59.696,44.29,83.254c15.698,15.713,33.931,27.552,53.36,35.426c29.146,11.811,60.97,14.758,91.455,8.863 c30.478-5.895,59.696-20.717,83.254-44.29l181.566-181.564L454.821,253.582z"></path>
                            </g>
                        </g>
                    </svg>
                </button>
                <input
                    type="text"
                    name="inputText"
                    id="inputText"
                    placeholder="Message"
                    className="w-full h-11 py-4 px-11 rounded-xl bg-message-bg"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="absolute top-0 bottom-0 right-4"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-icons"
                    >
                        <path d="M10.568 9.94977L3.03601 11.2058C2.94942 11.2202 2.86815 11.2572 2.80039 11.313C2.73263 11.3689 2.68077 11.4415 2.65001 11.5238L0.0530096 18.4808C-0.19499 19.1208 0.47401 19.7308 1.08801 19.4238L19.088 10.4238C19.2127 10.3615 19.3175 10.2658 19.3908 10.1472C19.4641 10.0287 19.503 9.89212 19.503 9.75277C19.503 9.61342 19.4641 9.47682 19.3908 9.3583C19.3175 9.23978 19.2127 9.14402 19.088 9.08177L1.08801 0.0817693C0.47401 -0.225231 -0.19499 0.385769 0.0530096 1.02477L2.65101 7.98177C2.68162 8.06418 2.73343 8.13707 2.8012 8.19307C2.86897 8.24908 2.9503 8.28623 3.03701 8.30077L10.569 9.55577C10.6154 9.56389 10.6574 9.58809 10.6876 9.62413C10.7179 9.66016 10.7345 9.70571 10.7345 9.75277C10.7345 9.79983 10.7179 9.84538 10.6876 9.88141C10.6574 9.91745 10.6154 9.94165 10.569 9.94977H10.568Z" />
                    </svg>
                </button>
            </form>
            <ImageUploadModal
                isOpen={isImageModalOpen}
                onClose={() => {
                    setIsImageModalOpen(false);
                }}
                chatId={chatId}
                uid={uid}
                cloudName="dbnjplscn"
                chatType={chatType}
            />
        </>
    );
}
