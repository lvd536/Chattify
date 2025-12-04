import ChatList from "./ChatList";
import NavHead from "./NavHead";

export default function NavBar() {
    return (
        <div className="flex flex-col w-4/12 border-r border-r-white/20">
            <NavHead />
            <ChatList />
        </div>
    );
}
