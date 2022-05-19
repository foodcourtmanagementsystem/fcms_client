import './FileInput.css';
import React from 'react';

const FileInput = React.forwardRef((props, ref) => {
  return (
    <input type="file"
           ref={ref}
            {...props}
             />
  );
});

export default FileInput;