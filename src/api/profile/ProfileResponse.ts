export type ProfileResponse = {
    status:  boolean;
    message: string;
    data:    Data;
}

export type Data = {
    name:                    string;
    email:                   string;
    type:                    number;
    is_active:               number;
    email_verified_at:       Date;
    updated_at:              Date;
    created_at:              Date;
    total_spent:             number;
    wallet_balance:          WalletBalance;
    wallet_prefix:           string;
    full_name:               string;
    gender:                  string;
    languages:               string[];
    nationality:             string;
    phone_code:              string;
    phone_number:            string;
    visa_status:             string;
    availability:            string;
    profile_picture:         string;
    summary:                 string;
    avatar:                  string;
    google_id:               string;
    id:                      string;
    created_at_utc:          Date;
    created_at_local:        Date;
    updated_at_utc:          Date;
    updated_at_local:        Date;
    email_verified_at_utc:   Date;
    email_verified_at_local: Date;
    timezone:                string;
}

export type WalletBalance = {
    amount: number;
}
