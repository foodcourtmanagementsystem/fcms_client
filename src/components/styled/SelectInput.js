import './SelectInput.css';

function SelectInput({items, label, name, error, ...props}) {
  return (
    <div className="select-input">
        {label && <label htmlFor={name} className="select-input__label">{label}</label>}
        <select {...props} name={name} id={name} className="select-input__content">
            {items.map((item, index) => (<option value={item.value} key={index}>{item.title}</option>))}
        </select>
        {error && <div className="select-input__error">
            {error}
        </div>}
    </div>
  );
}

export default SelectInput;