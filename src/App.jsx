import "./App.css";
import Sidebar from "./components/Sidebar";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";

function App() {
  return (
    <>
      <div className="w-full flex">
        {/* <Register /> */}
        <Login />
      </div>
    </>
  );
}

export default App;
