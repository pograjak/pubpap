import { vuexfireMutations } from "vuexfire";
import { auth } from "firebase";

export const state = () => ({
  user: {
    email: "",
    id: "",
    photoUrl: "",
    displayName: ""
  },
  homeTab: 0
});

export const getters = {
  user: state => state.user,
  homeTab: state => state.homeTab
};

export const mutations = {
  ...vuexfireMutations,
  onAuthStateChangedMutation: (state, { authUser }) => {
    if (!authUser) {
      state.user.email = "";
      state.user.id = "";
      state.user.photoUrl = "";
      state.user.displayName = "";
      state.homeTab = 0;
    } else {
      state.user.email = authUser.email;
      state.user.id = authUser.uid;
      state.user.photoUrl = authUser.photoUrl;
      state.user.displayName = authUser.displayName;
    }
  },
  changeHomeTab(state, tab){
    state.homeTab = tab;
  },
  changeDisplayName(state, displayName) {
    state.user.displayName = displayName;
  }
};

export const actions = {
  changeDisplayName: async function(ctx, displayName) {
    await this.$fireAuth.currentUser.updateProfile({
      displayName: displayName
    });

    ctx.commit("changeDisplayName", displayName);
  }
};
