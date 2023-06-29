import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Actions, State, Ilist } from "./interfaces/interface";
import { devtools, persist } from "zustand/middleware";
import { differenceInDays, format } from "date-fns";

export const useStore = create(
  devtools(
    persist(
      immer<State & Actions>((set, get) => ({
        assignmentList: [],
        showList: [],
        searchItem: "",

        setListItem: (item) => {
          set((state) => {
            if (item == "") {
              state.showList = state.assignmentList;
            } else {
              state.showList = state.assignmentList.filter((el) =>
                el.task.includes(item)
              );
            }
          });
        },

        addAssignment: (assignment) =>
          set((state) => {
            state.assignmentList.push(assignment);
            state.showList = state.assignmentList;
          }),

        deleteAssignment: (id) =>
          set((state) => {
            state.assignmentList = state.assignmentList.filter(
              (assign) => assign.id !== id
            );
            state.showList = state.assignmentList;
          }),

        setDone: (id) =>
          set((state) => {
            const assign = state.assignmentList.find((el) => el.id === id);
            if (assign) {
              assign.done = !assign.done;
              assign.dueDate = "";
              state.showList = state.assignmentList;
            }
          }),

        setDueDate: (id, date) =>
          set((state) => {
            const assign = state.assignmentList.find((el) => el.id === id);
            if (assign) {
              assign.done = false;
              assign.dueDate = date;
              state.showList = state.assignmentList;
            }
          }),

        completedCount: () => get().assignmentList.filter((a) => a.done).length,

        //no need to be an async function, just a sample for api data fetching
        fetchAssignments: async () => {
          const result = await JSON.parse(
            localStorage.getItem("Assignment-Storage")!
          );
          set({ assignmentList: result.state.assignmentList });
        },

        sortBy: (filterType: string | void) => {
          set((state) => {
            state.showList = state.assignmentList;
            state.showList.sort((a: Ilist, b: Ilist) => {
              if (a.done !== b.done) {
                return a.done ? 1 : -1;
              } else {
                // eslint-disable-next-line no-debugger
                // debugger;
                return a[<"task" | "dueDate">filterType].localeCompare(
                  b[<"task" | "dueDate">filterType]
                );
              }
            });
          });
        },
        sortByDone: () => {
          set((state) => {
            state.showList = state.assignmentList;
            state.showList.sort((a: Ilist, b: Ilist) => {
              if (a.done !== b.done) {
                return a.done ? -1 : 1;
              } else {
                return a.dueDate.localeCompare(b.dueDate);
              }
            });
          });
        },

        sortPassed: () =>
          set((state) => {
            state.showList = state.assignmentList.filter(
              (a) => differenceInDays(new Date(a.dueDate), new Date()) < -1
            );
          }),
        sortToday: () =>
          set((state) => {
            state.showList = state.assignmentList.filter(
              (a) =>
                a.dueDate &&
                format(new Date(a.dueDate), "y-MM-dd") ==
                  format(new Date(Date.now() - 86400000), "y-MM-dd")
            );
          }),
        sortTomarrow: () =>
          set((state) => {
            state.showList = state.assignmentList.filter(
              (a) =>
                a.dueDate &&
                format(new Date(a.dueDate), "y-MM-dd") !==
                  format(new Date(Date.now() - 86400000), "y-MM-dd") &&
                differenceInDays(new Date(a.dueDate), new Date()) == 0
            );
          }),
        sortOnGoing: () =>
          set((state) => {
            state.showList = state.assignmentList.filter(
              (a) => differenceInDays(new Date(a.dueDate), new Date()) > 0
            );
          }),
      })),
      { name: "Assignment-Storage" } //by default is localStorage and no need to add the second property like (, getStorage: () => sessionStorage )
    )
  )
);
