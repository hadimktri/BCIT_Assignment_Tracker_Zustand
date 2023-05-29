import { useStore } from "../../store";
import { Assignment } from "../Assignment/index";
import styles from "./assignments.module.css";
import SortListHead from "./SortListHead";

const Assignments = () => {
  const completedCount = useStore((state) => state.completedCount());

  const showList = useStore((state) => state.showList);

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{showList.length}</span>
        </div>
        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>
            {completedCount}
            {" of "}
            {showList.length}
          </span>
        </div>
      </header>
      <SortListHead />
      <div className={styles.list}>
        {showList.map((assign, idx) => (
          <div key={idx} className={styles.assignment}>
            <Assignment {...assign} />
          </div>
        ))}
      </div>
    </section>
  );
};
export default Assignments;
