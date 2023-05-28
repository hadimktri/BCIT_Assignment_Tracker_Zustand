import { useState, useRef, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
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

  const handleAssignment = (e: React.ChangeEvent<HTMLInputElement>, input: string) => {
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

  return (
    <header className={styles.header}>
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm}>
        <input
          ref={ref}
          placeholder="Add a new assignment"
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />
        <button
          disabled={!input.length}
          onClick={(e: any) => {
            handleAssignment(e, input);
          }}
        >
          Create
          <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
export default Header;
