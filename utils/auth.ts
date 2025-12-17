import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import {
    Auth,
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    sendEmailVerification,
    signInWithEmailAndPassword,
    updatePassword,
    UserCredential,
} from "firebase/auth";
import { IResetForm } from "@/types/IResetForm";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FirebaseError } from "firebase/app";
import { routes } from "./consts";

export const ensureUserInFirestore = async (firebaseUser: UserCredential) => {
    if (!firebaseUser) return;

    const userRef = doc(db, "users", firebaseUser.user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
        const user = {
            uid: firebaseUser.user.uid,
            email: firebaseUser.user.email ?? null,
            displayName: firebaseUser.user.displayName ?? "",
            photoURL: firebaseUser.user.photoURL ?? "",
            createdAt: serverTimestamp() as Timestamp,
            lastSeen: serverTimestamp() as Timestamp,
            description: "",
            username:
                firebaseUser.user.displayName
                    ?.toLowerCase()
                    .replace(/\s+/g, "") || "",
        };
        await setDoc(userRef, user);
    }
};

export const updateUserActiveStatus = async (uid: string) => {
    const userRef = doc(db, "users", uid);
    try {
        await setDoc(
            userRef,
            {
                lastSeen: serverTimestamp(),
            },
            { merge: true }
        );
    } catch (error) {
        console.error("Error updating user active status:", error);
    }
};

export const validatePasswordReset = (
    auth: Auth,
    formData: IResetForm,
    navigator: AppRouterInstance,
    setError: (value: React.SetStateAction<string | null>) => void
) => {
    if (!auth.currentUser) {
        setError("User not found");
        return;
    } else if (!auth.currentUser.email) return;
    else if (formData.newPassword !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
    } else if (formData.newPassword.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
    }
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        formData.currentPassword
    );
    reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
            if (!auth.currentUser) {
                setError("User not found");
                return;
            }
            updatePassword(auth.currentUser, formData.newPassword)
                .then(() => {
                    auth.signOut();
                    alert(
                        "Password reset successful. Please log in with your new password."
                    );
                    navigator.push("/");
                })
                .catch((err) => {
                    console.error(
                        "Error resetting password:",
                        err.code,
                        err.message
                    );
                    setError(
                        "Failed to reset password. Please try again later."
                    );
                });
        })
        .catch(() => {
            setError("Current password is incorrect. Please try again.");
        });
    setError(null);
};

export const validateUserAuth = async (
    auth: Auth,
    formData: {
        email: string;
        password: string;
    },
    type: "login" | "register",
    router: AppRouterInstance
) => {
    if (type === "login") {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            if (!user.emailVerified) {
                alert(
                    "Ваш email не подтвержден. Пожалуйста, проверьте вашу почту и подтвердите email."
                );
                return;
            }
            await ensureUserInFirestore(userCredential);
            router.push(routes.home.get.path);
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (
                    error.code === "auth/invalid-credential" ||
                    error.code === "auth/user-not-found" ||
                    error.code === "auth/wrong-password"
                ) {
                    alert(
                        "Неверный email или пароль. Пожалуйста, попробуйте еще раз."
                    );
                } else if (error.code === "auth/user-disabled") {
                    alert("Ваш аккаунт был заблокирован администратором.");
                } else {
                    alert(`Произошла ошибка: ${error.message}`);
                }
            } else {
                alert("Произошла непредвиденная ошибка.");
            }
        }
    } else {
        try {
            if (
                !formData.email ||
                !formData.password ||
                formData.password.length < 6
            ) {
                alert(
                    "Пожалуйста, заполните все поля и используйте пароль длиной не менее 8 символов."
                );
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await sendEmailVerification(userCredential.user);

            alert(
                "Письмо с подтверждением отправлено на вашу почту. Пожалуйста, подтвердите его, чтобы завершить регистрацию."
            );
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    alert(
                        "Пользователь с таким email уже существует. Пожалуйста, введите другой email или войдите в свой аккаунт."
                    );
                } else {
                    alert(`Произошла ошибка при регистрации: ${error.message}`);
                }
            } else {
                alert("Произошла непредвиденная ошибка при регистрации.");
            }
        }
    }
};
