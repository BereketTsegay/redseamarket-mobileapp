export type Country = {
    success: boolean;
    data:    Datum[];
}

export type Datum = {
    status:              number;
    name:                string;
    code:                string;
    phone_code:          string;
    phone_number_length: string;
    flag:                null;
    updated_at:          Date;
    created_at:          Date;
    id:                  string;
    currency:            Currency;
}

export type Currency = {
    status:         number;
    name:           string;
    country_id:     string;
    prefix:         string;
    currency_value: string;
    updated_at:     Date;
    created_at:     Date;
    is_base?:       string;
    id:             string;
}
