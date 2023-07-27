export class JobRequest{
    jobprofile_id:Number = 0;
    title:String = '';
    education: String = '';
    certificate: String = '';
    language: String = '';
    skils:String = '';
    cv_file:any = null;
    overview:String = '';
    country_id:Number = 0;
    state_id:Number = 0;
    city_id:Number = 0;
    company: CompanyField[] = [];
    work_experience: Number = 0;
}


export type CompanyField = {
    from_date: string;
    to_date: string;
    company: string;
}