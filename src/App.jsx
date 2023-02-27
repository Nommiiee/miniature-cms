import "./App.css";
import Sidebar from "./components/Sidebar";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      <div className="w-full flex">
        <Login />
      </div>
    </>
  );
}

export default App;
