function ResetPassword(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email} = props.email;
        fetch('http://localhost:5000/')
    }
  return (
    <>
      <div className="container ">
        <div className="card m-4">
          <div className="card-header">Featured</div>
          <div className="card-body">
            <h5 className="card-title">Enter registed email address</h5>
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
             
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
