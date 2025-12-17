import { routes } from "@/utils/consts";
import Link from "next/link";

interface IProps {
    isEmailUser: boolean;
}

export default function ProfileEditActions({ isEmailUser }: IProps) {
    return (
        <div className="pt-6 mt-3 flex flex-col gap-4 justify-end border-t border-edit-form-bg">
            {isEmailUser && (
                <Link
                    href={routes.home.profile.resetPassword.path}
                    className="flex items-center justify-center h-12 px-8 bg-edit-form-bg hover:bg-edit-form-bg/80 text-text font-bold rounded-lg transition-colors duration-300 focus:ring-edit-form-text/50"
                >
                    Reset password
                </Link>
            )}
            <div className="flex flex-col-reverse sm:flex-row gap-4">
                <Link
                    href={routes.home.get.path}
                    className="flex items-center justify-center h-12 px-8 bg-edit-form-bg hover:bg-edit-form-bg/80 text-text font-bold rounded-lg transition-colors duration-300 focus:ring-edit-form-text/50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="h-12 px-8 bg-primary hover:bg-blue-600/70 text-text font-bold rounded-lg shadow-lg shadow-blue-900/20 duration-300 transition-all active:scale-95"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
