import React, { createContext, useState } from 'react';

const CommonContext = createContext();

export class CommonRequest {
    //Common Country id
    common_country_id: any = null;
    language: any = 'en';
}

const CommonProvider = ({ children }) => {
  const [commonInput, setCommonInput] = useState<CommonRequest>(new CommonRequest());

  return (
    <CommonContext.Provider value={{ commonInput, setCommonInput }}>
      {children}
    </CommonContext.Provider>
  );
};

export { CommonContext, CommonProvider };