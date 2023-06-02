import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className='d-flex flex-column align-items-center' style={{ lineHeight: '1.25rem',
      padding: '0 0.75rem 0 0.75rem',
      alignItems: 'center',
}}>
      <p className='m-0'>{value}</p>
      <span style={{textTransform: 'uppercase', fontSize: '50%'}} className='pt-1 pt-sm-4'>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
