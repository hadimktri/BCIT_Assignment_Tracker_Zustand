import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Actions, State } from "./interfaces/interface";
import { devtools, persist } from "zustand/middleware";

export const useStore = create(
  devtools(
    persist(
      immer<State & Actions>((set, get) => ({
        assignmentList: [],
        addAssignment: (assignment) =>
          set((state) => {
            state.assignmentList.push(assignment);
          }),

        deleteAssignment: (id) =>
          set((state) => ({
            assignmentList: state.assignmentList.filter(
              (assign) => assign.id !== id
            ),
          })),

        setDone: (id) =>
          set((state) => {
            const assign = state.assignmentList.find((el) => el.id === id);
            if (assign) {
              assign.done = !assign.done;
              assign.dueDate = "";
            }
          }),

        setDueDate: (id, date) =>
          set((state) => {
            const assign = state.assignmentList.find((el) => el.id === id);
            if (assign) {
              assign.done = false;
              assign.dueDate = date;
            }
          }),

        completedCount: () => get().assignmentList.filter((a) => a.done).length,

        //no need to be an async function, just a sample for api data fetching
        fetchAssignments: async () => {
          const result = await JSON.parse(
            localStorage.getItem("Assignment-Storage")!
          );
          console.log(result.state.assignmentList);
          set({ assignmentList: result.state.assignmentList });
        },
      })),
      { name: "Assignment-Storage" } //by default is localStorage and no need to add the second property like (, getStorage: () => sessionStorage )
    )
  )
);
