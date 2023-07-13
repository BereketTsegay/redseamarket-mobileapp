export type Country = {
    status:  string;
    message: string;
    code:    number;
    country: CountryElement[];
}

export type CountryElement = {
    id:           number;
    code:         string;
    name:         string;
    phonecode:    number;
    created_at:   null;
    updated_at:   null;
    phone_length: null;
    status:       number;
}