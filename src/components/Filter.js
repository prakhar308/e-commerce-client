import React from 'react';

const Filter = ({ filter, onClick }) => {
   return (
      <button onClick={onClick}>
         {filter}
      </button>
   )
}

export default Filter;
   