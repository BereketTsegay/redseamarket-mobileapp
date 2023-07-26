export type CustomField = {
    status: string;
    code:   number;
    data:   Data;
}

export type Data = {
    category_field: CategoryField[];
}

export type CategoryField = {
    id:                       number;
    category_id:              number;
    subcategory_id:           number;
    disabled_in_sub_category: number;
    created_at:               Date;
    updated_at:               Date;
    deleted_at:               null;
    field:                    Field;
}

export type Field = {
    id:                    number;
    name:                  string;
    type:                  string;
    max:                   number;
    default_value:         null | string;
    description_area_flag: number;
    required:              number;
    status:                number;
    option:                number;
    created_at:            Date;
    updated_at:            Date;
    position:              string;
    field_option:          Option[]
}

export type Option = {
    id: number;
    value: string;
}