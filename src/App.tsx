import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login/login";
import CreateAccount from "./routes/Login/create-account";
import WhiteBoard from "./routes/WhiteBoard/WhiteBoardPage";
import WorkSpace from "./routes/WorkSpace/WorkSpacePage";
import ProtectedRoute from "./components/protected-route";
import FindFamily from "./routes/Login/find-family";
import Layout from "./routes/NavBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/workspace" element={<WorkSpace />} />
          <Route path="/whiteboard" element={<WhiteBoard />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/find-family" element={<FindFamily />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
