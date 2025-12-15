import { Dispatch, SetStateAction, useEffect } from "react";
import Logo from "./Logo";
import SearchButton from "./SearchButton";
import { getTheme, toggleTheme } from "@/stores/useThemeStore";
import ThemeToggle from "./ThemeToggle";

interface IProps {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
    setOnSearch: Dispatch<SetStateAction<boolean>>;
}

export default function NavHead({
    searchValue,
    setSearchValue,
    setOnSearch,
}: IProps) {
    useEffect(() => {
        if (searchValue.length <= 0) {
            setOnSearch(false);
        }
    }, [searchValue.length, setOnSearch]);
    return (
        <div className="flex relative flex-col gap-2 justify-center items-center mt-3 px-4">
            <ThemeToggle />
            <div className="flex gap-2 items-center">
                <Logo />
                <p className="font-bold">Chattify</p>
            </div>
            <form
                className="flex relative w-full"
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    if (searchValue.length <= 0) return;
                    setOnSearch(true);
                }}
            >
                <input
                    type="search"
                    placeholder="Search..."
                    className="block h-8 p-2 lg:p-4 w-full items-center rounded-lg bg-search-bar"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <SearchButton />
            </form>
        </div>
    );
}
