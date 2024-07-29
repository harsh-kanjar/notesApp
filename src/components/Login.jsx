import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", passward: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent from reload
    // Api call
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email:credentials.email, passward:credentials.passward }),
    });
    const json = await response.json();
    console.log(json);
    // ------------------------------------
    if(json.success){
        localStorage.setItem('token',json.authToken) //tested - work proper
        navigate("/");  // redirect
        alert('Logged in successfully')
    }else{
       alert('Invalid credentials')
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <div className="jumbotron jumbotron-fluid my-4">
          <div className="container">
            <h1 className="display-4">Welcome to notesApp</h1>
            <p className="lead">Your notes are few clicks ahed..!</p>
          </div>
        </div>
        <form
          className="border rounded border-dark my-4 p-4"
          style={{ backgroundColor: "#e6ede5" }}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="johndoe@gmail.com"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passward">Password</label>
            <input
              name="passward"
              type="password"
              className="form-control"
              value={credentials.passward}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link
            title="not functional"
            type="button"
            className="btn btn-outline-secondary mx-2"
            to='/reset'
          >
            Forgot password
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
