import React, { createContext, useState } from 'react';
import { JobRequest } from './JobRequest';

const JobContext = createContext();

const JobProvider = ({ children }) => {
  const [jobInput, setJobInput] = useState<JobRequest>(new JobRequest());

  return (
    <JobContext.Provider value={{ jobInput, setJobInput }}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobProvider };