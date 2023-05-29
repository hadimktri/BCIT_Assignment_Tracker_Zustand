import { useState, useRef, useEffect } from "react";
import { uppercase } from "../../helpers/stringHelpers";
import { useStore } from "../../store";
import styles from "./header.module.css";

function Header() {
  const [input, setInput] = useState<string>("");
  const ref = useRef<any>();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const addAssignment = useStore((state) => state.addAssignment);
  const setListItem = useStore((state) => state.setListItem);

  const handleCreate = (e: any, input: string) => {
    e.preventDefault();
    input.length &&
      addAssignment({
        id: new Date().getTime(),
        task: input,
        done: false,
        dueDate: "",
      });
    setInput("");
  };

  useEffect(() => {
    setListItem(input);
  }, [input]);

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
          onClick={(e: any) => {
            handleCreate(e, input);
          }}
        >
          Add
        </button>
      </form>
    </header>
  );
}
export default Header;
