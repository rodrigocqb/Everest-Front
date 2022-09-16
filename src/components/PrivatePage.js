import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function PrivatePage({ children }) {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!localUser) {
      navigate("/login");
    } else if (!user) {
      setUser(localUser);
    }
  }, [localUser, navigate, setUser, user]);

  if (!user) {
    return <></>;
  }

  return <>{children}</>;
}
