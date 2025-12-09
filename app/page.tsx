import NavigationButtons from "@/components/Auth/Buttons/NavigationButtons";

export default function Home() {
    return (
        <div className="flex h-dvh items-center justify-center bg-background font-sans">
            <div className="flex flex-col items-center min-h-125 max-w-110 justify-between p-6 md:p-8 bg-auth-form/30 rounded-xl shadow-sm shadow-gray-600">
                <h1 className="text-xl font-medium">Auth form</h1>
                <p className="text-xl text-center p-4">
                    Log in to your account to start chatting with friends and
                    making new acquaintances!
                </p>
                <NavigationButtons />
            </div>
        </div>
    );
}
