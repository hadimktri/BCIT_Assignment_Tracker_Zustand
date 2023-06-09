import styles from "./assignment.module.css";
import { TbTrash, TbCircle, TbCircleCheckFilled } from "react-icons/tb";
import { differenceInDays, format } from "date-fns";
import DatePicker from "./DatePicker";
import { useStore } from "../../store";
import { Ilist } from "../../interfaces/interface";

export function Assignment({ id, task, done, dueDate }: Ilist) {
  const setDone = useStore((state) => state.setDone);
  const setDueDate = useStore((state) => state.setDueDate);
  const deleteAssignment = useStore((state) => state.deleteAssignment);

  const handleDaySelect = (date: Date) => {
    setDueDate(id, format(date, "y-MM-dd"));
    console.log(typeof format(date, "y-MM-dd"));
  };

  const handleDueDisplay = (date: any) => {
    let diff: string | number = differenceInDays(new Date(date), new Date());
    let d1 = format(new Date(date), "y-MM-dd");
    let d2 = format(new Date(Date.now() - 86400000), "y-MM-dd"); //Date.now() - 86400000 cuts 1day = yesterday
    diff =
      d1 === d2
        ? "Today"
        : diff === 0
        ? "Tomarrow"
        : diff < 0
        ? "Passed"
        : `${diff + 1} days`;
    return (
      <div className={`due ${diff}`}>
        <span>{diff}</span>
        <span>{dueDate}</span>
      </div>
    );
  };

  return (
    <>
      <div className={styles.left}>
        <button className={styles.checkContainer} onClick={() => setDone(id)}>
          {done ? <TbCircleCheckFilled size={20} /> : <TbCircle size={20} />}
        </button>
        {dueDate && handleDueDisplay(dueDate)}
        <span className={done ? styles.textCompleted : ""}>{task}</span>
      </div>

      <div className={styles.right}>
        <div>
          <DatePicker handleDaySelect={handleDaySelect} />
        </div>
        <button
          className={styles.deleteButton}
          onClick={() => deleteAssignment(id)}
        >
          <TbTrash size={20} />
        </button>
      </div>
    </>
  );
}
