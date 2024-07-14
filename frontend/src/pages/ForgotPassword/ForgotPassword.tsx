import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {};

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState<string>();
  const navigate = useNavigate();

  return (
    <div className="forgot-password">
      <div className="content">
        <h1>Forgot Password</h1>
        <h4>Enter your email to reset your password</h4>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="true"
          required
        />
        <button
          className="btn btn-outline-light"
          type="submit"
          onClick={async () => {
            console.log(email);
            try {
              const data = await axios.post(
                "http://localhost:5104/EmailSender2/SendEmail",
                {
                  to: email,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              toast.success(data.data);
            } catch (e: any) {
              console.error("ERROR: " + e.message);
            } finally {
            }
          }}
        >
          Reset Password
        </button>
        <p className="go-to-login" onClick={() => navigate("/login")}>
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
