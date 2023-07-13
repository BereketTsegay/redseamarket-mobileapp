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
