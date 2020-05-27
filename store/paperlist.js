import { firestoreAction } from "vuexfire";

export const state = () => ({
  p: {
    my: [], // own papers
    sub: [], // subscribed papers
    fav: [], // favorite papers
    rec: [] // recent papers
  }
});

export const getters = {
  mypapers: state => state.p.my,
  subpapers: state => state.p.sub,
  favpapers: state => state.p.fav,
  recentpapers: state => state.p.rec
};

export const mutations = {
  addToList: function(state, { l, pap }) {
    state.p[l].push(pap);
  },
  resetList: function(state, l) {
    state.p[l] = [];
  },
  editPaper: function(state, {paperId, changes}){
    for (let list in state.p){ // change paperId in all lists in state.p
      for(let paper of state.p[list].filter(pap => pap.id == paperId)){ // find object with given paperId
        for (let attr in changes) { paper[attr] = changes[attr]; }
      }
    }
  }
};

function loadPapsWithUsr(ctx, arr_name, uid) {
  let pRef = ctx.$fireStore
    .collection("papers")
    .where(arr_name, "array-contains", uid)
    .orderBy("createdAt", "desc");
  return pRef.get();
}

export const actions = {
  loadMyPapers: async function(ctx, { userId }) {
    ctx.commit("resetList", "my");

    let pRef = this.$fireStore
      .collection("papers")
      .where("authorId", "==", userId)
      .orderBy("createdAt", "desc");
    let p = await pRef.get();
    p.forEach(function(doc) {
      const dat = doc.data();
      dat.id = doc.id;
      ctx.commit("addToList", { l: "my", pap: dat });
    });
  },

  loadSubsPapers: async function(ctx, { userId }) {
    ctx.commit("resetList", "sub");
    let p = await loadPapsWithUsr(this, "requestPresentation.subsIds", userId);
    p.forEach(function(doc) {
      let dat = doc.data();
      dat.id = doc.id;
      ctx.commit("addToList", { l: "sub", pap: dat });
    });
  },

  loadFavPapers: async function(ctx, { userId }) {
    ctx.commit("resetList", "fav");
    let p = await loadPapsWithUsr(this, "favs", userId);
    p.forEach(function(doc) {
      let dat = doc.data();
      dat.id = doc.id;
      ctx.commit("addToList", { l: "fav", pap: dat });
    });
  },

  loadRecentPapers: async function(ctx, {}) {
    ctx.commit("resetList", "rec");

    let pRef = this.$fireStore
      .collection("papers")
      .orderBy("createdAt", "desc")
      .limit(10);
    let p = await pRef.get();
    p.forEach(function(doc) {
      const dat = doc.data();
      dat.id = doc.id;
      ctx.commit("addToList", { l: "rec", pap: dat });
    });
  },

  editPaper: async function(ctx, {paperId, changes}){
    let pRef = this.$fireStore.collection("papers").doc(paperId);
    await pRef.update(changes);
    ctx.commit("editPaper", { paperId: paperId, changes: changes });
  },

};
