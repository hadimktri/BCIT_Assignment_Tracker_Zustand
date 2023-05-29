import styles from "./assignments.module.css";
import { useStore } from "../../store";
import { TbCircleFilled } from "react-icons/tb";

const SortListHead = () => {
  const sortByDone = useStore((state) => state.sortByDone);
  const sortByDueDate = useStore((state) => state.sortByDueDate);
  const sortByTitle = useStore((state) => state.sortByTitle);
  const sortPassed = useStore((state) => state.sortPassed);
  const sortToday = useStore((state) => state.sortToday);
  const sortTomarrow = useStore((state) => state.sortTomarrow);
  const sortOnGoing = useStore((state) => state.sortOnGoing);

  return (
    <div className={styles.sort}>
      <div className={styles.left}>
        <div className={styles.leftSort}>
          <span onClick={sortByDone}>Done</span>
          <span onClick={sortByDueDate}>Due</span>
          <span onClick={sortByTitle}>Title</span>
        </div>
        <div className={styles.colordSort}>
          <span onClick={sortPassed}>
            <TbCircleFilled size={20} />
          </span>
          <span onClick={sortToday}>
            <TbCircleFilled size={20} />
          </span>
          <span onClick={sortTomarrow}>
            <TbCircleFilled size={20} />
          </span>
          <span onClick={sortOnGoing}>
            <TbCircleFilled size={20} />
          </span>
        </div>
      </div>
      <div className={styles.right}>
        <span>Pick Day</span>
        <span>Delete</span>
      </div>
    </div>
  );
};

export default SortListHead;
