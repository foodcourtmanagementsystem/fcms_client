import './Success.css';

function Success({success, style}) {
  return (
    <div className="success" style={style}>
        {success}
    </div>
  );
}

export default Success;