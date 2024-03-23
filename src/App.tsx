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
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/firstpage" element={<FirstPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/workspace" element={<WorkSpace />} />
            <Route path="/whiteboard" element={<WhiteBoard />} />
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
