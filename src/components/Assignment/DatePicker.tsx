import Dropdown from "react-bootstrap/Dropdown";
import { TbCalendarDue } from "react-icons/tb";
import { DayPicker } from "react-day-picker";
import { dropdownCSS } from "./dropdownCSS";
import { IdatePicker } from "../../interfaces/interface";


function DatePicker({ handleDaySelect }: IdatePicker) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="none"
        className="text-white"
        id="dropdown-basic"
      >
        <TbCalendarDue size={20} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <DayPicker
          mode="single"
          onSelect={handleDaySelect}
          styles={dropdownCSS}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DatePicker;
