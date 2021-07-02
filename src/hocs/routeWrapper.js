import React from 'react';

const wrapper = WrapperComponent => page => {
  const withPage = ({...p}) => <WrapperComponent {...p} page={page} />;

  return withPage;
};

export default wrapper;
