import React from 'react';

const TickerHeaders = () => {
  return (
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th className='hidden md:table-cell'>Divident</th>
        <th className='hidden md:table-cell'>Yield</th>
        <th></th>
      </tr>
    </thead>
  );
};

export default TickerHeaders;
