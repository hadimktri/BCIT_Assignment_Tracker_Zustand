export interface Ilist {
  id: number;
  task: string;
  done: boolean;
  dueDate: string;
}

export interface IdatePicker {
  handleDaySelect: (value: Date) => void;
}

export type State = {
  assignmentList: Ilist[];
};

export type Actions = {
  addAssignment: (assignment: Ilist) => void;
  setDone: (id: number) => void;
  setDueDate: (id: number, date: string) => void;
  deleteAssignment: (id: number) => void;
  completedCount: () => number;
  fetchAssignments: () => void;
  
};
