import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login/login";
import CreateAccount from "./routes/Login/create-account";
import WhiteBoard from "./routes/WhiteBoard/WhiteBoardPage";
import WorkSpace from "./routes/WorkSpace/WorkSpacePage";
import ProtectedRoute from "./components/protected-route";
import FindFamily from "./routes/Login/find-family";
import { useEffect, useState } from "react";
import { auth } from "./routes/firebase";
import Layout from "./routes/NavBar";
import FirstPage from "./routes/Login/firstpage";
import Home from "./routes/Home/HomePage";
import Profile from "./routes/Profile/ProfilePage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      {isLoading ? (
        <>Loading</>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/workspace" element={<WorkSpace />} />
            <Route path="/whiteboard" element={<WhiteBoard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/find-family" element={<FindFamily />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
