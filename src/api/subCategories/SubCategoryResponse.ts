export type SubCategoryResponse = {
    success: boolean;
    data:    Datum[];
}

export type Datum = {
    status:      string;
    name:        string;
    description: null | string;
    slug:        string;
    parent_id:   string;
    image?:      string;
    updated_at:  Date;
    created_at:  Date;
    id:          string;
}
