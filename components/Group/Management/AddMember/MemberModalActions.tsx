interface IProps {
    setIsActive: () => void;
    handleAddMembers: () => void;
}

export default function MemberModalActions({
    handleAddMembers,
    setIsActive,
}: IProps) {
    return (
        <div className="flex items-center justify-between">
            <button
                className="p-2 rounded-lg bg-auth-input hover:bg-auth-input-hover transition-bg duration-300"
                onClick={handleAddMembers}
            >
                Add members
            </button>
            <button
                className="p-2 rounded-lg bg-auth-input-bg hover:bg-auth-input-bg/90 transition-bg duration-300"
                onClick={setIsActive}
            >
                Cancel
            </button>
        </div>
    );
}
