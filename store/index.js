import { vuexfireMutations } from "vuexfire";

export const state = () => ({
  user: {
    email: "",
    id: ""
  }
});

export const getters = {
  user: state => state.user
};

export const mutations = {
  ...vuexfireMutations,
  onAuthStateChangedMutation: (state, { authUser }) => {
    if (!authUser) {
      state.user.email = "";
      state.user.id = "";
    } else {
      state.user.email = authUser.email;
      state.user.id = authUser.uid;
      
    }
  }
};

export const actions = {};
