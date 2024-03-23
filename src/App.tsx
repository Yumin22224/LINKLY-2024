import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login/login";
import CreateAccount from "./routes/Login/create-account";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>

      </Routes>
    </>
  );
}

export default App;
