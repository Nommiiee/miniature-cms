import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <div className="w-full flex">
        <Sidebar />
        <div
          id="viewPort"
          className="w-full h-screen overflow-y-scroll overflow-x-hidden"
        ></div>
      </div>
    </>
  );
}

export default App;
