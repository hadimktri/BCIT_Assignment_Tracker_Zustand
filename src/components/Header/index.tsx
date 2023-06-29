import { useState, useRef, useEffect } from "react";
import { uppercase } from "../../helpers/stringHelpers";
import { useStore } from "../../store";
import styles from "./header.module.css";

function Header() {
  const [input, setInput] = useState<string>("");
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const addAssignment = useStore((state) => state.addAssignment);

  const handleCreate = (e: any) => {
    e.preventDefault();
    e.target.value.length &&
      addAssignment({
        id: new Date().getTime(),
        task: e.target.value,
        done: false,
        dueDate: "",
      });
    setInput("");
  };

  return (
    <header className={styles.header}>
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm}>
        <input
          ref={ref}
          placeholder="Search / Add "
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />
        <button
          disabled={!input.length}
          value={input}
          onClick={(e) => {
            handleCreate(e);
          }}
        >
          Add
        </button>
      </form>
    </header>
  );
}
export default Header;
