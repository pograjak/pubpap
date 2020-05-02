import { vuexfireMutations } from "vuexfire";

export const state = () => ({
  user: {
    email: ""
  }
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
    } else {
      state.user.email = authUser.email;
    }
  }
};

export const actions = {};
