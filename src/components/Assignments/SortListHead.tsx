import styles from "./assignments.module.css";
import { useStore } from "../../store";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const SortListHead = () => {
  const sortBy = useStore((state) => state.sortBy);
  const sortByDone = useStore((state) => state.sortByDone);
  const sortPassed = useStore((state) => state.sortPassed);
  const sortToday = useStore((state) => state.sortToday);
  const sortTomarrow = useStore((state) => state.sortTomarrow);
  const sortOnGoing = useStore((state) => state.sortOnGoing);

  return (
    <div className={styles.sortContainer}>
      <div className={styles.left}>
        <div className={styles.leftSort}>
          <span onClick={sortByDone}>
            <span>Done</span>
            <RiArrowDropDownLine size={25} />
          </span>
          <span onClick={() => sortBy("dueDate")}>
            <span>Due</span>
            <RiArrowDropDownLine size={25} />
          </span>
          <span onClick={() => sortBy("task")}>
            <span>Title</span>
            <RiArrowDropDownLine size={25} />
          </span>
        </div>
        <div className={styles.colordSort}>
          <span onClick={sortPassed}>
            <IoIosArrowDropdownCircle size={25} />
          </span>
          <span onClick={sortToday}>
            <IoIosArrowDropdownCircle size={25} />
          </span>
          <span onClick={sortTomarrow}>
            <IoIosArrowDropdownCircle size={25} />
          </span>
          <span onClick={sortOnGoing}>
            <IoIosArrowDropdownCircle size={25} />
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
