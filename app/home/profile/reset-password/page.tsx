import Header from "@/components/Header";
import ResetForm from "@/components/Profile/ResetForm";

export default function page() {
    return (
        <div className="w-full">
            <Header>Change password</Header>
            <ResetForm />
        </div>
    );
}
