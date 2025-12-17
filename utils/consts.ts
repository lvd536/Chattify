const HOME = "/home";
const AUTH = "/auth";

export const routes = {
    home: {
        get: {
            path: "/",
            name: "Home",
        },
        chat: {
            path: `${HOME}/chat/`,
            name: "Chat",
        },
        createGroup: {
            path: `${HOME}/create-group/`,
            name: "Group Creation",
        },
        group: {
            path: `${HOME}/group/`,
            name: "Group",
            manage: {
                path: `${HOME}/group/manage/`,
                name: "Group Manage",
            },
        },
        profile: {
            path: `${HOME}/profile/`,
            name: "Profile",
            resetPassword: {
                path: `${HOME}/profile/reset-password`,
                name: "Profile Password Reset",
            },
        },
        user: {
            path: `${HOME}/user/`,
            name: "User",
        },
    },
    auth: {
        get: {
            path: AUTH,
            name: "Auth",
        },
        forgotPassword: {
            path: `${AUTH}/forgot-password/`,
            name: "Forgot Password",
        },
        login: {
            path: `${AUTH}/login/`,
            name: "Login",
        },
        register: {
            path: `${AUTH}/register/`,
            name: "Register",
        },
    },
} as const;
