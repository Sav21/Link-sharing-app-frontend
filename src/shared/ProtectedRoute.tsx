import { useAtomValue } from "jotai";
import { Navigate } from "react-router-dom";
import { apiAccessTokenAtom } from "../store";

const ProtectedRoute = ({ children }) => {
  const token = useAtomValue(apiAccessTokenAtom);

  if (token) {
    return <>{children}</>;
  }

  return <Navigate to={"/auth/login"}></Navigate>;
  return null;
};

export default ProtectedRoute;