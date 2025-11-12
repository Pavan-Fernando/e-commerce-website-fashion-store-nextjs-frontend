const API_URL = process.env.NEXT_PUBLIC_API_URL!;
import toast from "react-hot-toast";

export interface LoginResponse {
    userId: number;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    roles: string[];
}

export interface ErrorResponse {
    error: {
        code: string;
        type: string;
        message: string;
    };
}

export interface UserResponse {
    userId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    imageUrl: string;
}

export interface SignUpRequest {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    password: string;
}

export const getUser = {
    async getUserById(userId: number): Promise<UserResponse> {
        const token = sessionStorage.getItem("accessToken");
        if (!token) throw new Error("No token");

        const res = await fetch(`${API_URL}/users/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
    },
};


export const customer = {
    async signup(data: Omit<SignUpRequest, "confirmPassword">): Promise<void> {
        const payload: SignUpRequest = {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: data.password,
        };

        const res = await fetch(`${API_URL}/users/customer/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.status != 201) {
            const err = await res.json().catch(() => ({}));
            const message = err.error?.message || "Signup failed";
            throw new Error(message);
        }
    },
};


export const authApi = {
    async login(username: string, password: string): Promise<LoginResponse> {
        const res = await fetch(`${API_URL}/auth/log-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            const err: ErrorResponse = await res.json();
            throw new Error(err.error.message);
        }

        return res.json();
    },

    async refreshToken(refreshToken: string): Promise<Pick<LoginResponse, "accessToken" | "expiresIn">> {
        const res = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) throw new Error("Session expired");
        return res.json();
    },

    async logout(): Promise<void> {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) return;

    const res = await fetch(`${API_URL}/auth/log-out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      }
    });
    if (res.status === 204) {
        toast.success("Logged out successfully!");
      }
  },
};