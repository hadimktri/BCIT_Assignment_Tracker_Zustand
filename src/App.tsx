import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Assignments from "./components/Assignments";
import { useStore } from "./store";
import { useEffect } from "react";

const App = () => {
  const fetchAssignments = useStore((state) => state.fetchAssignments);

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <>
      <Header />
      <Assignments />
    </>
  );
};
export default App;
