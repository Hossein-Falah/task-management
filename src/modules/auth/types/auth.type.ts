export type AuthResponse = {
    message: string;
    accessToken: string;
    refreshToken: string;
}

export type TokenPayload = {
    email:string;
}