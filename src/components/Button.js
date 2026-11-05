import React from 'react';

// Botón reutilizable con variantes: primary, secondary y danger
function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
