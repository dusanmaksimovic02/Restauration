import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ResetPassword.css";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {};

const ResetPassword = (props: Props) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(email, token);
    try {
      const response = await axios.post(
        "http://localhost:5104/api/Auth/reset-password",
        {
          email: email,
          token: token,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successful");
        navigate("/login");
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error: any) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <div className="reset-password">
      <div className="content">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-outline-light">
            Reset Password
          </button>
        </form>
        <p className="go-to-home" onClick={() => navigate("/")}>
          Go home
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
