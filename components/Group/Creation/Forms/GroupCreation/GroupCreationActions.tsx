import { routes } from "@/utils/consts";
import Link from "next/link";

export default function GroupCreationActions() {
    return (
        <div className="pt-6 mt-3 flex flex-col-reverse sm:flex-row gap-4 items-center justify-center border-t border-edit-form-bg">
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
                Create group
            </button>
        </div>
    );
}
