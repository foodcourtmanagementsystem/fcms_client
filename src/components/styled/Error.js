import './Error.css';

function Error({error, style}) {
  if(typeof error === 'string')
  {
    return (
      <div className="error" style={style}>
          {error}
      </div>
    );
  }

  return (<ul className="error error--list">
            {error.map((e, index) => <li key={index}>{e}</li>)}
        </ul>);

}

export default Error;