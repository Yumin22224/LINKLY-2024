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
<<<<<<< Updated upstream
import FirstPage from "./routes/Login/firstpage";
=======
import Whiteboard from "./routes/WhiteBoard/WhiteBoardPage";
>>>>>>> Stashed changes

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
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/firstpage" element={<FirstPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/workspace" element={<WorkSpace />} />
            <Route path="/whiteboard" element={<WhiteBoard />} />
=======
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
<<<<<<< Updated upstream
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/workspace" element={<WorkSpace />} />
            <Route path="/whiteboard" element={<WhiteBoard />} />
            <Route path="/profile" element={<Profile />} />
>>>>>>> 8e3f93cb3240748febabba65367844ec6f826258
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/find-family" element={<FindFamily />} />
            </Route>
=======
          <Route path="/workspace" element={<WorkSpace />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/find-family" element={<FindFamily />} />
>>>>>>> Stashed changes
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
