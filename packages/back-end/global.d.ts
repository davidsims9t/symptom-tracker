type Email = `${string}@${string}`;

type JWTClaims = {
    userId: string;
    isEmailVerified: boolean;
    email: string;
    username: string;
    adminUser: boolean;
};

type JWTToken = string;

type SessionId = string;

type RefreshToken = string;