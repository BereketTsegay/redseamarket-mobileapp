export type ProfileResponse = {
    status:  string;
    message: string;
    code:    number;
    data:    Data;
}

export type Data = {
    myads:       number;
    myfavourite: number;
    user:        User;
    adsView:     number;
}

export type User = {
    id:                  number;
    name:                string;
    email:               string;
    phone:               number;
    nationality_id:      number;
    email_verified_at:   number;
    type:                number;
    status:              number;
    email_verified_flag: number;
    delete_status:       number;
    created_at:          Date;
    updated_at:          Date;
    wallet:              number;
    image:               string;
}