// import {LoginResponse} from "@/lib/api";
//
// export interface AuthUser {
//     userId: number;
//     email: string;
//     name: string;
//     avatar?: string;
//     roles: string[];
// }
//
// export const auth = {
//     setSession(data: LoginResponse, email: string, name: string) {
//         const user: AuthUser = {
//             userId: data.userId,
//             email,
//             name,
//             avatar: "/avatar.jpg",
//             roles: data.roles,
//         };
//
//         sessionStorage.setItem("accessToken", data.accessToken);
//         sessionStorage.setItem("refreshToken", data.refreshToken);
//         sessionStorage.setItem("user", JSON.stringify(user));
//         sessionStorage.setItem("expiresAt", String(Date.now() + data.expiresIn * 1000));
//     },
//
//     getToken() {
//         return sessionStorage.getItem("accessToken");
//     },
//
//     getUser(): AuthUser | null {
//         const user = sessionStorage.getItem("user");
//         return user ? JSON.parse(user) : null;
//     },
//
//     isAuthenticated() {
//         const token = this.getToken();
//         const expiresAt = sessionStorage.getItem("expiresAt");
//         return token && expiresAt && Date.now() < Number(expiresAt);
//     },
//
//     logout() {
//         sessionStorage.clear();
//     },
// };
//
//
// export interface AuthUser {
//     userId: number;
//     email: string;
//     firstName: string;
//     lastName: string;
//     roles: string[];
// }
//
// export const auth = {
//
//     setSession(data: LoginResponse, email: string, name: string) {
//         const user: AuthUser = {
//             userId: data.userId,
//             email,
//             name,
//             avatar: "/avatar.jpg",
//             roles: data.roles,
//         };
//
//         sessionStorage.setItem("accessToken", data.accessToken);
//         sessionStorage.setItem("refreshToken", data.refreshToken);
//         sessionStorage.setItem("user", JSON.stringify(user));
//         sessionStorage.setItem("expiresAt", String(Date.now() + data.expiresIn * 1000));
//     },
//
//     getUser(): AuthUser | null {
//         const user = sessionStorage.getItem("user");
//         return user ? JSON.parse(user) : null;
//     },
//
//     isAuthenticated() {
//         const token = sessionStorage.getItem("accessToken");
//         const expiresAt = sessionStorage.getItem("expiresAt");
//         return token;
//     },
//
//     logout() {
//         sessionStorage.clear();
//     },
// };


// src/lib/auth.ts
export interface AuthUser {
    userId: number;
    email: string;
    name: string;
    avatar?: string;
    roles: string[];
}

export const auth = {
    getUser(): AuthUser | null {
        const user = sessionStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        const token = sessionStorage.getItem("accessToken");
        const expiresAt = sessionStorage.getItem("expiresAt");
        return token && expiresAt && Date.now() < Number(expiresAt);
    },

    logout() {
        sessionStorage.clear();
    },
};