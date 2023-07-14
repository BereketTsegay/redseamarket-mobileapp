export type CurrencyResponse = {
    status:   string;
    code:     string;
    currency: Currency;
    usdval:   number;
}

export type Currency = {
    id:            number;
    country_id:    number;
    currency_code: string;
    currency_name: string;
    created_at:    null;
    updated_at:    Date;
    value:         string;
}