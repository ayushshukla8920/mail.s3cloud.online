import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/check-auth", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status !== 200) {
          navigate("/auth");
        }
      })
      .catch(() => navigate("/auth"));
  }, []);

  return children;
}
