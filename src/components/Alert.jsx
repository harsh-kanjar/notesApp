const Alert = (props) => {
  return (
    <div>
      <div className={`alert alert-${props.type}`} role="alert">
        {props.message}
      </div>
    </div>
  );
};

export default Alert;
