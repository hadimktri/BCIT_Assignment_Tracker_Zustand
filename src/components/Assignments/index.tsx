import { useStore } from "../../store";
import { Assignment } from "../Assignment/index";
import styles from "./assignments.module.css";

const Assignments = () => {
  const assignmentList = useStore((state) => state.assignmentList);
  const completedCount = useStore((state) => state.completedCount());

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignmentList.length}</span>
        </div>
        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>
            {completedCount}
            {" of "}
            {assignmentList.length}
          </span>
        </div>
      </header>
      <div className={styles.list}>
        {assignmentList.map((assign, idx) => (
          <div key={idx}>
            <Assignment {...assign} />
          </div>
        ))}
      </div>
    </section>
  );
};
export default Assignments;
