import { firestoreAction } from "vuexfire";

export const state = () => ({
  userinfo: {}
});

export const getters = {
  name: state => state.userinfo.name,
  affil: state => state.userinfo.affil
};

export const mutations = {
  loadUserInfo: function(state, userinfo) {
    state.userinfo = userinfo;
  }
};

export const actions = {
  loadUserInfo: async function(ctx, userId) {
    let p;

    let pRef = this.$fireStore.collection("users").doc(userId);
    p = await pRef.get();
    if (!p.exists) {
      return false;
    }
    console.log(p.data());

    ctx.commit("loadUserInfo", p.data());
    return true;
  },
  setUserInfo: async function(ctx, { userId, name, affil }){
    let pRef = this.$fireStore.collection("users").doc(userId);
    await pRef.set({
        name: name,
        affil: affil
    });

    ctx.commit("loadUserInfo", {
        name: name,
        affil: affil
    });

  }
};
