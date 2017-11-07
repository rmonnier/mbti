import React from 'react';
import messages from './../../messages';

const NotFound = () => {
  const pageNotFound = messages['general.pageNotFound'];
  const noPage = messages['general.noPage'];

  return (
    <div className="not-found">
      <h1>{pageNotFound}</h1>
      <p>{noPage}</p>
    </div>
  );
};

export default NotFound;
