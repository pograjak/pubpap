import { firestoreAction } from "vuexfire";

export const state = () => ({
  mypapers: [],
  subpapers: [],
  favpapers: []
});

export const getters = {
  mypapers: state => state.mypapers,
  subpapers: state => state.subpapers,
  favpapers: state => state.favpapers
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
  },
  addToFavpapers: function(state, pap) {
    state.favpapers.push(pap);
  },
  resetFavpapers: function(state) {
    state.favpapers = [];
  }
};

function loadPapsWithUsr(ctx, arr_name, uid){
  let pRef = ctx.$fireStore
  .collection("papers")
  .where(arr_name, "array-contains", uid);
  return pRef.get();
}

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
    ctx.commit("resetSubpapers");
    let p = await loadPapsWithUsr(this, "requestPresentation.subsIds", userId);
    p.forEach(function(doc) {
      let dat = doc.data();
      dat.id = doc.id;
      ctx.commit("addToSubpapers", dat);
    });
  },

  loadFavPapers: async function(ctx, userId) {
    ctx.commit("resetFavpapers");
    let p = await loadPapsWithUsr(this, "favs", userId);
    p.forEach(function(doc) {
      let dat = doc.data();
      dat.id = doc.id;
      ctx.commit("addToFavpapers", dat);
    });
  },
};
