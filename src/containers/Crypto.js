import React from 'react';

const Crypto = props => {
  console.log('single crypto');
  console.log('props', props);

  return (
    <div>
      <p>Bitcoin</p>
      <div>price: 45$</div>
    </div>
  );
};

export default Crypto;
