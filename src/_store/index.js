import { hookstate, useHookstate } from "@hookstate/core";

const initialState = hookstate({
  activeUser: {},
});

export const useGlobalState = () => {
  const state = useHookstate(initialState);
  return {
    getActiveUser: () => state.activeUser,
    setActiveUser: (user) => {
      state.activeUser.set({ user });
    },
  };
};
