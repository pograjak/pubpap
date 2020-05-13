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
    let pRef = await this.$fireStore.collection("papers").doc(paperId);
    let p = await pRef.get();

    ctx.commit("loadPaper", p.data());
  }
};
