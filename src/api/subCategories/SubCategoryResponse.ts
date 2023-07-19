export type SubCategoryResponse = {
    status:        string;
    message:       string;
    code:          number;
    subcategories: Subcategory[];
}

export type Subcategory = {
    id:                number;
    parent_id:         number;
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
    status:         number;
    sort_order:     number;
    delete_status:  number;
    created_at:     Date;
    updated_at:     Date;
}
