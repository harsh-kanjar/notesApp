import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
    const [credentials, setCredentials] = useState({name:"", email: "", passward: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault(); //prevent from reload
      const {name,email,passward} = credentials;
      // Api call
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({name,email,passward}),
      });
      const json = await response.json();
      console.log(json);
      // ------------------------------------
      if(json.success){
          alert("Account created successfully");
          navigate("/login");  // redirect
      }else{
          alert("Invalid credentials");
      }
    };
  
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  return (
    <>
      <div className="container">
        <div className="container my-4 ">
          <div className="jumbotron jumbotron-fluid my-4">
            <div className="container">
              <h1 className="display-4">Welcome to notesApp</h1>
              <p className="lead">
                Please fill below details to register yourself..! share your
                experience and suggesions with us <a href="/">@Feedback</a>
              </p>
            </div>
          </div>
          <form
            className="border rounded border-dark my-4 p-4"
            style={{ backgroundColor: "#e6ede5" }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="name"
                placeholder="John Doe"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email"
                placeholder="johndoe@gmail.com"
                onChange={onChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="passward">Password</label>
              <input
                name="passward"
                type="password"
                className="form-control"
                id="passward"
                required
                minLength={5}
                onChange={onChange}
              />
            </div>
            <small id="emailHelp" className="form-text text-muted">
              Passward must contains an upper case letter , a number and a
              special charecter.
            </small>
            <div className="form-group">
              <label htmlFor="cpassward">Confirm Password</label>
              <input
                name="cpassward"
                type="password"
                className="form-control"
                id="cpassward"
                required
                minLength={5}
              />
            </div>
            <div className="form-group form-check my-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
