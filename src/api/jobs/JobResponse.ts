export type JobResponse = {
    status: string;
    data:   Data;
}

export type Data = {
    id:              number;
    user_id:         number;
    title:           string;
    work_experience: string;
    education:       string;
    certificate:     string;
    language:        string;
    skils:           string;
    cv_file:         string;
    overview:        string;
    country_id:      number;
    state_id:        number;
    city_id:         number;
    created_at:      Date;
    updated_at:      Date;
    company:         Company[];
}

export type Company = {
    id:             number;
    job_profile_id: number;
    from_date:      string;
    to_date:        string;
    company:        string;
    created_at:     Date;
    updated_at:     Date;
}
