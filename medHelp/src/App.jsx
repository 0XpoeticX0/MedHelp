import { Outlet } from "react-router";
import NavBar from "./components/shared/NavBar";

function App() {
  return (
    <div className="text-black">
      <div className="top-0 sticky z-10">
        <NavBar />
      </div>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
