import {
    promoteUserToAdmin,
    demoteUserFromAdmin,
    kickUserFromGroup,
} from "@/utils/group";

interface IProps {
    memberId: string;
    groupId: string;
    isAdmin: boolean;
}

export default function MemberControls({ groupId, memberId, isAdmin }: IProps) {
    const handlePromoteUser = (userId: string) => {
        if (!isAdmin) {
            promoteUserToAdmin(groupId, userId).then(() =>
                window.location.reload()
            );
        } else {
            demoteUserFromAdmin(groupId, userId).then(() =>
                window.location.reload()
            );
        }
    };
    return (
        <>
            <div className="flex flex-col justify-between items-center">
                <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-icons"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => kickUserFromGroup(groupId, memberId)}
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                        <g id="User / User_Close">
                            <path
                                id="Vector"
                                d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M17 14L19 12M19 12L21 10M19 12L17 10M19 12L21 14M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </g>
                </svg>
                <svg
                    width="21"
                    height="21"
                    viewBox="0 0 1920 1920"
                    className="fill-icons"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handlePromoteUser(memberId)}
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M276.941 440.584v565.722c0 422.4 374.174 625.468 674.71 788.668l8.02 4.292 8.131-4.292c300.537-163.2 674.71-366.268 674.71-788.668V440.584l-682.84-321.657L276.94 440.584Zm682.73 1479.529c-9.262 0-18.523-2.372-26.993-6.89l-34.9-18.974C588.095 1726.08 164 1495.906 164 1006.306V404.78c0-21.91 12.65-41.788 32.414-51.162L935.727 5.42c15.134-7.228 32.866-7.228 48 0l739.313 348.2c19.765 9.374 32.414 29.252 32.414 51.162v601.525c0 489.6-424.207 719.774-733.779 887.943l-34.899 18.975c-8.47 4.517-17.731 6.889-27.105 6.889Zm467.158-547.652h-313.412l-91.595-91.482v-83.803H905.041v-116.78h-83.69l-58.503-58.504c-1.92.113-3.84.113-5.76.113-176.075 0-319.285-143.21-319.285-319.285 0-176.075 143.21-319.398 319.285-319.398 176.075 0 319.285 143.323 319.285 319.398 0 1.92 0 3.84-.113 5.647l350.57 350.682v313.412Zm-266.654-112.941h153.713v-153.713L958.462 750.155l3.953-37.27c1.017-123.897-91.595-216.621-205.327-216.621S550.744 588.988 550.744 702.72c0 113.845 92.612 206.344 206.344 206.344l47.21-5.309 63.811 63.7h149.873v116.78h116.781v149.986l25.412 25.299Zm-313.4-553.57c0 46.758-37.949 84.706-84.706 84.706-46.758 0-84.706-37.948-84.706-84.706s37.948-84.706 84.706-84.706c46.757 0 84.706 37.948 84.706 84.706"
                            fillRule="evenodd"
                        />
                    </g>
                </svg>
            </div>
        </>
    );
}
