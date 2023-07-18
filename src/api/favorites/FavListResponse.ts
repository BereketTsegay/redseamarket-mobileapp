export type FavList = {
    status:    string;
    message:   string;
    code:      number;
    favourite: Favourite[];
}

export type Favourite = {
    id:          number;
    customer_id: number;
    ads_id:      number;
    created_at:  Date;
    updated_at:  Date;
    currency:    string;
    isFavourite: number;
    city_name:   string;
    ads:         Ads;
}

export type Ads = {
    id:                   number;
    category_id:          number;
    subcategory_id:       number;
    title:                string;
    title_arabic:         string;
    canonical_name:       string;
    description:          string;
    description_arabic:   string;
    price:                number;
    negotiable_flag:      number;
    country_id:           number;
    state_id:             number;
    city_id:              number;
    sellerinformation_id: number;
    customer_id:          number;
    payment_id:           number;
    featured_flag:        number;
    latitude:             string;
    longitude:            string;
    view_count:           number;
    notification_status:  string;
    created_at:           Date;
    updated_at:           Date;
    area:                 string;
    accept_at:            Date;
    start_at:             Date;
    sub_area:             null;
    sub_area2:            null;
    image:                Image[];
    country_name:         string;
    state_name:           string;
    custom_value:         any[];
}

export type Image = {
    id:         number;
    image:      string;
    created_at: Date;
    updated_at: Date;
}
