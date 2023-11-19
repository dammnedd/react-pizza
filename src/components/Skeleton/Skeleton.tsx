import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => {
  return (
    <ContentLoader
      className={'pizza-block'}
      speed={2}
      width={320}
      height={524}
      viewBox="0 0 300 524"
      backgroundColor="#ffecd5"
      foregroundColor="#ecebeb"
    >
      <circle cx="140" cy="125" r="125" />
      <rect x="0" y="281" rx="5" ry="5" width="280" height="27" />
      <rect x="263" y="467" rx="0" ry="0" width="0" height="1" />
      <rect x="0" y="324" rx="10" ry="10" width="280" height="88" />
      <rect x="129" y="427" rx="30" ry="30" width="152" height="45" />
      <rect x="2" y="438" rx="5" ry="5" width="91" height="27" />
    </ContentLoader>
  );
};

export default Skeleton;
