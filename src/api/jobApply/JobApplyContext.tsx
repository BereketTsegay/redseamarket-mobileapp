import React, { createContext, useState } from 'react';
import { JobApplyRequest } from './JobApplyRequest';

const JobApplyContext = createContext();

const JobApplyProvider = ({children}) => {
    const [jobApplyInput, setJobApplyInput] = useState<JobApplyRequest>(new JobApplyRequest());

    return (
        <JobApplyContext.Provider value={{ jobApplyInput, setJobApplyInput}}>
            {children}
        </JobApplyContext.Provider>
    )
}

export { JobApplyContext, JobApplyProvider };