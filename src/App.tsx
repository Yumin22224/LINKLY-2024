import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login/login";
import CreateAccount from "./routes/Login/create-account";
import WorkSpace from "./routes/WorkSpace/WorkSpacePage";
import ProtectedRoute from "./components/protected-route";
import FindFamily from "./routes/Login/find-family";
import { useEffect, useState } from "react";
import { auth } from "./routes/firebase";
import Layout from "./routes/NavBar";
import FirstPage from "./routes/Login/firstpage";
import Home from "./routes/Home/HomePage";
import Profile from "./routes/Profile/ProfilePage";
import Whiteboard from "./routes/WhiteBoard/WhiteBoardPage";

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
<<<<<<< HEAD
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/" element={<Layout />}>
            <Route path="/firstpage" element={<FirstPage />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/workspace" element={<WorkSpace />} />
            <Route path="/whiteboard" element={<WhiteBoard />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/" element={<ProtectedRoute />}>
=======
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
>>>>>>> a2e9790981430edc9dd0017181597bc1bd40dc31
              <Route path="/find-family" element={<FindFamily />} />
              <Route path="/home" element={<Home />} />
              <Route path="/workspace" element={<WorkSpace />} />
              <Route path="/firstpage" element={<FirstPage />} />
              <Route path="/whiteboard" element={<Whiteboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      )}
    </>
  );
}

export default App;
