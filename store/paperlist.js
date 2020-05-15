import { firestoreAction } from "vuexfire";

export const state = () => ({
  mypapers: [],
  subpapers: []
});

export const getters = {
  mypapers: state => state.mypapers,
  subpapers: state => state.subpapers,
};

export const mutations = {
  addToMypapers: function(state, pap) {
    state.mypapers.push(pap);
  },
  resetMypapers: function(state) {
    state.mypapers = [];
  },
  addToSubpapers: function(state, pap) {
    state.subpapers.push(pap);
  },
  resetSubpapers: function(state) {
    state.subpapers = [];
  }
};

export const actions = {
  loadMyPapers: async function(ctx, userId) {
    let p;
    ctx.commit("resetMypapers");

    let pRef = this.$fireStore
      .collection("papers")
      .where("authorId", "==", userId);
    p = await pRef.get();
    p.forEach(function(doc) {
      const dat = doc.data();
      dat.id = doc.id;
      ctx.commit("addToMypapers", dat);
    });
  },

  loadSubsPapers: async function(ctx, userId) {
    let p;
    ctx.commit("resetSubpapers");

    let pRef = this.$fireStore
      .collection("papers")
      .where("requestPresentation.subsIds", "array-contains", userId);
    p = await pRef.get();
    p.forEach(function(doc) {
      const dat = doc.data();
      dat.id = doc.id;
      ctx.commit("addToSubpapers", dat);
    });
  }
};
