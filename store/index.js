import { vuexfireMutations } from "vuexfire";
import { auth } from "firebase";

export const state = () => ({
  user: {
    email: "",
    id: "",
    photoUrl: ""
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
      state.user.photoUrl = "";
    } else {
      state.user.email = authUser.email;
      state.user.id = authUser.uid;
      state.user.photoUrl = authUser.photoUrl;
    }
  }
};

export const actions = {};
