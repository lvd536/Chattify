import Avatar from "../Chat/Avatar";
import Details from "../Chat/Details";
import Name from "../Chat/Name";

interface IProps {
    name: string;
    avatarUrl: string;
    lastMessage: string;
}

export default function Chat({ name, avatarUrl, lastMessage }: IProps) {
    return (
        <li className="flex items-center gap-4 p-2 hover:bg-white/2 transition-bg duration-300">
            <Avatar alt="User Avatar" src={avatarUrl} name={name} />
            <div>
                <Name>{name}</Name>
                <Details>{lastMessage}</Details>
            </div>
        </li>
    );
}
