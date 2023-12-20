import React from 'react';
import PropTypes from 'prop-types';

const Button = ({color, onClick, children, type}) => {
  const getColorClass = () => {
    switch (color) {
      case 'red':
        return 'bg-red-500 text-white';
      case 'white':
        return 'bg-white text-black border border-gray-300';
      default:
        return 'bg-second text-white hover:text-third ';
    }
  };

  return (
    <button
      className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline active:scale-95 ${getColorClass()}`}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(['red', 'white']),
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
