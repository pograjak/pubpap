import { vuexfireMutations } from "vuexfire";

export const state = () => ({
  user: {}
});

export const getters = {
  user: state => state.user
};

export const mutations = {
  ...vuexfireMutations,
  onAuthStateChangedMutation: (state, { authUser }) => {
    console.log(authUser);

    if (!authUser) {
      state.user.email = "";
      state.user = {};
    } else {
      state.user.email = authUser.email;
    }
  }
};

export const actions = {};
