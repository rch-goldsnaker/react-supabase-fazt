import { useState } from "react";
import { supabase } from "../supabase/client";

function Login() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await supabase.auth.signInWithOtp({
        email: email,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <input
            type="email"
            name="email"
            placeholder="youremail@site.com"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
