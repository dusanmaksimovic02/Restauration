import { useSearchParams } from "react-router-dom";
import "./ConfirmEmail.css";
import { useEffect } from "react";
import axios from "axios";

type Props = {};

const ConfirmEmail = (props: Props) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const confirm = async () => {
      try {
        console.log(`http://localhost:5104/api/Auth/ConfirmEmail/${email}`);
        const response = await axios.get(
          `http://localhost:5104/api/Auth/ConfirmEmail/${email}`
        );
        console.log(response);
      } catch (error) {
        console.error("Error confirming email", error);
      }
    };

    confirm();
  }, [token, email]);

  return (
    <div className="confirm-email">
      <h1>Uspesno ste verifikovali nalog</h1>
    </div>
  );
};

export default ConfirmEmail;
