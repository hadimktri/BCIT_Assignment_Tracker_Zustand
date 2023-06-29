export interface Ilist {
  id: number;
  task: string;
  done: boolean;
  dueDate: string;
}

export interface IdatePicker {
  handleDaySelect: () => void;
}

export type State = {
  assignmentList: Ilist[];
  showList: Ilist[];
  searchItem: string;
};

export type Actions = {
  addAssignment: (assignment: Ilist) => void;
  setDone: (id: number) => void;
  setDueDate: (id: number, date: string) => void;
  deleteAssignment: (id: number) => void;
  completedCount: () => number;
  fetchAssignments: () => void;
  sortByDone: () => void;
  sortBy: (filterType: string) => void;
  setListItem: (item: string) => void;
  sortPassed: () => void;
  sortToday: () => void;
  sortTomarrow: () => void;
  sortOnGoing: () => void;
};
