export type Dashboard = {
    status: string;
    code:   number;
    data:   Data;
}

export type Data = {
    loged_user_status: boolean;
    user_name:         string;
    categories:        Categor[];
    slider:            Slider;
    categories_ads:    Categor[];
}

export type Categor = {
    id:             number;
    name:           string;
    canonical_name: string;
    description:    string;
    image:          string;
    display_flag:   number;
    status?:        number;
    sort_order?:    number;
    reserved_flag:  number;
    delete_status?: number;
    created_at:     Date;
    updated_at:     Date;
    expire_days:    number | null;
    type:           number | null;
    percentage:     number | null;
    subcategory?:   Subcategory[];
    ads?:           Ad[];
}

export type Ad = {
    id:                  number;
    title:               string;
    title_arabic:        null | string;
    canonical_name:      string;
    description:         string;
    description_arabic:  null | string;
    price:               number;
    negotiable_flag:     number;
    featured_flag:       number;
    latitude:            string;
    longitude:           string;
    view_count:          number;
    notification_status: string;
    created_at:          Date;
    updated_at:          Date;
    area:                null | string;
    accept_at:           Date;
    start_at:            Date;
    sub_area:            null | string;
    sub_area2:           null | string;
    isFavourite:         number;
    country:             string;
    currency:            string;
    state:               string;
    city:                string;
    ad_image:            AdImage | null;
    custom_value:        CustomValue[];
}

export type AdImage = {
    id:         number;
    ads_id:     number;
    img_flag:   number;
    image:      string;
    created_at: Date;
    updated_at: Date;
}

export type CustomValue = {
    id:         number;
    value:      string;
    file:       number;
    created_at: Date;
    updated_at: Date;
    position:   string;
    name:       string;
}


export type Subcategory = {
    id:                number;
    name:              string;
    canonical_name:    string;
    image:             string;
    description:       string;
    created_at:        Date;
    updated_at:        Date;
    subcategory_child: SubcategoryChild[];
}

export type SubcategoryChild = {
    id:             number;
    category_id:    number;
    parent_id:      number;
    name:           string;
    canonical_name: string;
    image:          string;
    description:    string;
    type:           number;
    percentage:     number;
    created_at:     Date;
    updated_at:     Date;
}

export type Slider = {
    id:         number;
    name:       string;
    image:      string;
    country_id: number;
    status:     number;
    created_at: Date;
    updated_at: Date;
}


export type DashBoardDetails = {
    status:  string;
    message: string;
    code:    number;
    ads:     Details_Ad[];
    lastpay: number;
}

export type Details_Ad = {
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
    status:               number;
    notification_status:  string;
    created_at:           Date;
    updated_at:           Date;
    area:                 string;
    accept_at:            Date;
    start_at:             Date;
    sub_area:             string;
    sub_area2:            string;
    image:                Image[];
    created_on:           string;
    updated_on:           string;
    country_name:         string;
    currency:             string;
    state_name:           string;
    city_name:            string;
    isFavourite:          number;
    seller:               string;
    category:             Category;
    motore_value:         MotoreValue;
    motor_features:       MotorFeature[];
    property_rend:        Property;
    property_sale:        Property;
    payment:              Payment;
    custom_value:         CustomValue[];
    seller_information:   SellerInformation;
}

export type Category = {
    id:             number;
    name:           string;
    canonical_name: string;
    description:    string;
    image:          string;
    display_flag:   number;
    status:         number;
    sort_order:     number;
    reserved_flag:  number;
    delete_status:  number;
    created_at:     Date;
    updated_at:     Date;
    expire_days:    null;
    type:           number;
    percentage:     null;
}

export type MotorFeature = {
    id:         number;
    ads_id:     number;
    value:      string;
    created_at: Date;
    updated_at: Date;
}

export type MotoreValue = {
    id:                number;
    ads_id:            number;
    make_id:           number;
    model_id:          number;
    varient_id:        number;
    registration_year: string;
    fuel_type:         string;
    transmission:      string;
    condition:         string;
    milage:            number;
    created_at:        Date;
    updated_at:        Date;
    make:              Make;
    model:             Make;
    variant:           Variant;
}

export type Make = {
    id:         number;
    name:       string;
    status:     number;
    sort_order: number;
    image?:     string;
    created_at: Date;
    updated_at: Date;
    make_id?:   number;
}

export type Variant = {
    id:         number;
    model_id:   number;
    name:       string;
    status:     number;
    order:      number;
    created_at: Date;
    updated_at: Date;
}

export type Property = {
    id:            number;
    ads_id:        number;
    size:          number;
    room:          number;
    furnished:     string;
    building_type: string;
    parking:       number;
    created_at:    Date;
    updated_at:    Date;
}

export type Image = {
    id:         number;
    image:      string;
    created_at: Date;
    updated_at: Date;
}

export type Payment = {
    id:           number;
    payment_id:   string;
    amount:       number;
    ads_id:       number;
    name:         string;
    email:        string;
    phone:        string;
    payment_type: number;
    document:     null;
    status:       string;
    created_at:   Date;
    updated_at:   Date;
    parent:       string;
}

export type SellerInformation = {
    id:              number;
    name:            string;
    email:           string;
    phone:           string;
    phone_hide_flag: number;
    address:         string;
    created_at:      Date;
    updated_at:      Date;
}

