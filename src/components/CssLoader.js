/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
const CssLoader = React.memo(({isLoading})=>{
  return (
    isLoading && (
      <div className="cssload">
        <div className="cssload__whirlpool"></div>
      </div>
      )
  );
})

export default CssLoader;