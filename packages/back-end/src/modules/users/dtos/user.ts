export type UserDto = {
    gender?: "male" | "female" | "neutral" | "non-binary" | "agender" | "transgender" | "gender-fluid";
    id?: string | null;
    username?: string | null;
    email: Email;
    password?: string | null;
    birthMonth: number;
    birthYear: number;
    birthDay: number;
    firstName?: string | null;
    lastName?: string | null;
    isEmailVerified?: boolean | null;
    isAdminUser?: boolean | null;
    isDeleted?: boolean | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    lastLogin?: Date | null;
};

type ClerkEmailVerification = {
    status: string;
    strategy: string;
};

type ClerkEmailAddress = {
    email_address: string;
    id: string;
    linked_to: string[];
    object: string;
    verification: ClerkEmailVerification;
};

export type UserClerkDto = {
    birthday: string;
    created_at: number;
    email_addresses: ClerkEmailAddress[];
    external_accounts: any[];
    external_id: string;
    first_name: string;
    gender: string;
    id: string;
    last_name: string;
    locked: boolean;
    last_sign_in_at: number;
    object: string;
    password_enabled: boolean;
    phone_numbers: any[];
    primary_email_address_id: string;
    primary_phone_number_id: string | null;
    primary_web3_wallet_id: string | null;
    private_metadata: Record<string, any>;
    profile_image_url: string;
    public_metadata: Record<string, any>;
    two_factor_enabled: boolean;
    unsafe_metadata: Record<string, any>;
    updated_at: number;
    username: string | null;
    web3_wallets: any[];
};