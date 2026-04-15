export type AdListResponse = {
    success: boolean;
    message: string;
    data:    Data;
}

export type Data = {
    status:   string;
    page:     number;
    per_page: number;
    count:    number;
    ads:      Ad[];
}

export type Ad = {
    status:             string;
    ref_no:             string;
    user_id:            string;
    category:           string;
    subcategory:        string;
    category_id:        string;
    subcategory_id:     string;
    inner_category_id:  null | string;
    inner_category:     null | string;
    fields:             Fields;
    images:             string[];
    location:           null;
    saved:              string;
    country_id:         string;
    country_name:       string;
    payment_status:     string;
    main_category_id:   string;
    main_category_slug: string;
    updated_at:         Date;
    created_at:         Date;
    reject_reason:      null;
    expiry_date?:       Date;
    reviwed_by:         string;
    id:                 string;
    created_at_utc:     Date;
    created_at_local:   Date;
    updated_at_utc:     Date;
    updated_at_local:   Date;
    expiry_date_utc?:   Date;
    expiry_date_local?: Date;
    timezone:           string;
}

export type Fields = {
    KARAT?:                    string;
    GRAM?:                     string;
    "Ads Countries"?:          string[];
    Package:                   string;
    CERTIFICATE?:              string;
    "Head Line"?:              string;
    "Visa Status"?:            string;
    "Expected Salary"?:        string;
    "Job Description"?:        string;
    "Work Experience"?:        string;
    "Education Level"?:        string;
    Commitment?:               string;
    "Current Company"?:        string;
    Nationality?:              string;
    "Current Position"?:       string;
    "Employeement Type"?:      string;
    "Notice Period"?:          string;
    Location?:                 Location;
    Resume?:                   string;
    Title?:                    string;
    "360 Tour URL"?:           string;
    "YouTube URL"?:            string;
    Price?:                    string;
    "Phone number"?:           string;
    "Price Negotiable"?:       string;
    "Describe your property"?: string;
    Size?:                     string;
    "Total closing fee"?:      string;
    Bedrooms?:                 string;
    Bathrooms?:                string;
    "Ready by"?:               string;
    "Annual Community Fee"?:   string;
    "Is it furnished"?:        string;
    "Seller Transfer fee"?:    string;
    "Property status"?:        string;
    "Occupancy Status"?:       string;
    Amenities?:                string[];
    Country?:                  string;
    State?:                    string;
    City?:                     string;
    Area?:                     string;
    "Sub Area"?:               string;
    Images?:                   string[];
    "Phone Number"?:           string;
    Description?:              string;
    "Sub Area2"?:              string;
}

export type Location = {
    lat: string;
    lng: string;
}
