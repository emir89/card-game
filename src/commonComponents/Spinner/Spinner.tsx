import React from 'react';
import ReactSpinner from 'react-spinkit';

const Spinner = ({ size = 100, position = 'fixed', style, color }) => {
  let defaultStyle = {
    position: position,
    top: '50%',
    left: '50%',
    width: size,
    marginLeft: `-${size / 2}px`,
    padding: 0,
    zIndex: 3,
  };

  return (
    <ReactSpinner
      name="ball-beat"
      fadeIn={'none'}
      style={Object.assign(defaultStyle, style)}
      color={color}
    />
  );
};

export default Spinner;
