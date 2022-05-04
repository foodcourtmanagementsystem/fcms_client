import React from 'react';
import './TextInput.css';

const TextInput = React.forwardRef(({label, name, value, onChange, placeholder, type, error}, ref) => {

  return (
    <div className='text-input'>
        {label && <label htmlFor={name} className='text-input__label'>{label}</label>}
        <input type={type ? type : "text"} ref={ref} name={name} value={value} id={name} onChange={onChange} placeholder={placeholder} autoComplete="off" className='text-input__content' />
        {error && <div className='text-input__error'>{error}</div>}
    </div>
  );
});

export default TextInput;