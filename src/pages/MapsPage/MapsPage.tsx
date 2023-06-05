import React, { lazy } from 'react';
const CitiesMap = lazy(() => import('@entities/map'));

const MapsPage = () => {
  return (
    <>
      <CitiesMap />
    </>
  );
};

export default MapsPage;
