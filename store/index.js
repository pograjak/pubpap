import { vuexfireMutations } from "vuexfire";

export const state = () => ({
  user: "null"
});

export const getters = {
  user: state => state.user
};

export const mutations = {
  ...vuexfireMutations,
  onAuthStateChangedMutation: (ctx, { authUser }) => {
    if (!authUser) {
      ctx.user = null;
    } else {
      ctx.state.user.email = authUser.email;
    }
  }
};

export const actions = {};
