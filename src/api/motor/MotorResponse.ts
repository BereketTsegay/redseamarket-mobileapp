export type Motor = {
    status:  string;
    message: string;
    code:    number;
    model:   Make[];
    make:    Make[];
    variant: Variant[];
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
