import React, { createContext, useState } from 'react';
import { PlaceAdRequest } from './PlaceAdRequest';

const PlaceAdContext = createContext();

const PlaceAdProvider = ({ children }) => {
  const [placeAdInput, setPlaceAdInput] = useState<PlaceAdRequest>(new PlaceAdRequest());

  return (
    <PlaceAdContext.Provider value={{ placeAdInput, setPlaceAdInput }}>
      {children}
    </PlaceAdContext.Provider>
  );
};

export { PlaceAdContext, PlaceAdProvider };