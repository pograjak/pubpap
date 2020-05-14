import { firestoreAction } from "vuexfire";

export const state = () => ({
  paper: {}
});

export const getters = {
  paper: state => state.paper
};

export const mutations = {
  loadPaper: function(state, paper) {
    state.paper = paper;
  }
};

export const actions = {
  loadPaper: async function(ctx, paperId) {
    let p;
    try {
      let pRef = this.$fireStore.collection("papers").doc(paperId);
      p = await pRef.get();
      if (!p.exists) {
        throw "paper does not exixsts";
      }
    } catch (error) {
      throw error;
    }
    ctx.commit("loadPaper", p.data());
  }
};
