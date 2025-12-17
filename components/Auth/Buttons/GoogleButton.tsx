import { ensureUserInFirestore } from "@/utils/auth";
import { routes } from "@/utils/consts";
import { auth } from "@/utils/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
    const router = useRouter();
    const handleGoogleSignIn = async () => {
        try {
            const user = await signInWithPopup(auth, new GoogleAuthProvider());
            await ensureUserInFirestore(user);
            router.push(routes.home.get.path);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <button
            className="flex min-w-[232px] items-center justify-center overflow-hidden rounded-lg h-12 px-5 tracking-[0.015em] w-full gap-2 border border-gray-200 hover:bg-blue-300/10 transition-colors"
            onClick={handleGoogleSignIn}
        >
            <svg
                height="20"
                viewBox="0 0 48 48"
                width="20"
                x="0px"
                xmlns="http://www.w3.org/2000/svg"
                y="0px"
            >
                <path
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    fill="#FFC107"
                ></path>
                <path
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    fill="#FF3D00"
                ></path>
                <path
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.657-3.356-11.303-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z"
                    fill="#4CAF50"
                ></path>
                <path
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.371,34.221,44,28.718,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    fill="#1976D2"
                ></path>
            </svg>
            <span className="truncate">Войти через Google</span>
        </button>
    );
}
