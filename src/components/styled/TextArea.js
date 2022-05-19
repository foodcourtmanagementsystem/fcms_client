import React from 'react';
import './TextArea.css';

const TextArea = React.forwardRef(({label, name, value, onChange, placeholder, rows, error}, ref) => {
  return (
    <div className='text-area'>
        {label && <label htmlFor={name} className='text-area__label'>{label}</label>}
        <textarea rows={rows ? rows : 3} ref={ref} name={name} value={value} id={name} onChange={onChange} placeholder={placeholder} autoComplete="off" className='text-area__content'></textarea>
        {error && <div className='text-area__error'>{error}</div>}
    </div>
  );
});

export default TextArea;