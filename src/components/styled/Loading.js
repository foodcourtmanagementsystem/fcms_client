import './Loading.css';

function Loading({style}) {
  return (
    <div className="loading-container">
        <div className="loading" style={style}></div>
    </div>
  );
}

export default Loading;