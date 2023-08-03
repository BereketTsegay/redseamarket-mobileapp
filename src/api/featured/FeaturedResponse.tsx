export type FeaturedResponse = {
    status:      string;
    code:        string;
    subcategory: Subcategory;
}

export type Subcategory = {
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
    percentage:     number;
}
