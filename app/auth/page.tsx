import AuthForm from "@/components/Auth/Forms/AuthForm";

interface IFormData {
    [key: string]: string;
}

export default function page() {
    return (
        <div>
            <AuthForm />
        </div>
    );
}
