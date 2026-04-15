export type CustomField = {
    success: boolean;
    data:    Data;
}

export type Data = {
    category:   string;
    fields:     Field[];
    updated_at: Date;
    created_at: Date;
    id:         string;
}

export type Field = {
    label:              string;
    type:               string;
    dropdown:           null | string;
    required:           number;
    active:             number;
    sort_order:         number;
    secondary_dropdown: null | string;
    multi_select:       string;
    word_limit:         number | null;
    file_limit:         null;
    radio_options?:     string[];
}
