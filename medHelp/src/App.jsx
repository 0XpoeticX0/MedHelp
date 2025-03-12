import { Outlet } from "react-router";
import NavBar from "./components/shared/NavBar";

function App() {
  return (
    <div className="text-black">
      <div className="">
        <NavBar />
      </div>
      <Outlet />
    </div>
  );
}

export default App;
