import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../routes/firebase";

export default function ProtectedRoute() {
  const user = auth.currentUser
  if (user === null){
    return <Navigate to="/login"/>
  }
  return <Outlet/>;
}
