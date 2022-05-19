import React from 'react';
import './NumberInput.css';

const NumberInput = React.forwardRef(({label, name, value, onChange, placeholder, error, ...props}, ref) => {

  return (
    <div className='number-input'>
        {label && <label htmlFor={name} className='number-input__label'>{label}</label>}
        <input type="number" ref={ref} name={name} value={value} id={name} onChange={onChange} placeholder={placeholder} autoComplete="off" className='number-input__content' {...props} />
        {error && <div className='number-input__error'>{error}</div>}
    </div>
  );
});

export default NumberInput;