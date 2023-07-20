export type Country = {
    status:  string;
    message: string;
    code:    number;
    country?: CountryElement[];
    state?:   City[];
    city?:    City[];
}

export type City = {
    id:          number;
    name:        string;
    state_id?:   number;
    created_at:  null;
    updated_at:  null;
    country_id?: number;
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