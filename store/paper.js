import { firestoreAction } from "vuexfire";

export const state = () => ({
  paper: {}
});

export const getters = {
  paper: state => state.paper,
  requestPresentation: state => state.paper.requestPresentation,
};

export const mutations = {
  loadPaper: function(state, paper) {
    // console.log(paper);
    state.paper = paper;
  },
  addUserToFav: function(state, uid){
    state.paper.favs.push(uid);
  },
  rmUserFromFav: function(state, uid){
    state.paper.favs = state.paper.favs.filter(function(e){ return e != uid });
  }

};

export const actions = {
  loadPaper: async function(ctx, paperId) {
    console.log("LOAD PAPER DISPATCH");
    let p;
    try {
      let pRef = this.$fireStore.collection("papers").doc(paperId);
      p = await pRef.get();
      if (!p.exists) {
        throw "paper does not exist";
      }
    } catch (error) {
      throw error;
    }
    ctx.commit("loadPaper", p.data());
  },

  editFavorites: async function({commit, state}, paperId) {
    let pRef = this.$fireStore.collection("papers").doc(paperId);
    const uid = this.$fireAuth.currentUser.uid;

    var added = false;
    var setter = this.$fireStoreObj.FieldValue;
    if (state.paper.favs.includes(uid)) {
      setter = setter.arrayRemove(uid);
    } else {
      setter = setter.arrayUnion(uid);
      added = true;
    }
    // store the change on Firestore
    await pRef.update({ favs: setter });
    
    // commit locally
    if(added){
      commit("addUserToFav", uid);
    }else{
      commit("rmUserFromFav", uid);
    }
  },

  updateHasImg: async function(ctx, item) {
    let pRef = this.$fireStore.collection("papers").doc(item.paperId);
    await pRef.set({ hasImg: item.hasImg }, { merge: true });
  },

  uploadThumbnail: async function(ctx, item) {
    await ctx.dispatch("updateHasImg", { paperId: item.paperId, hasImg: true });

    const imgName = "paper_thumbnails/" + item.paperId;
    await this.$fireStorage
      .ref()
      .child(imgName)
      .putString(item.img, "data_url");
  },

  deleteThumbnail: async function(ctx, paperId) {
    const imgName = "paper_thumbnails/" + paperId;

    await this.$fireStorage
      .ref()
      .child(imgName)
      .delete()
      .catch(err => {
        console.log(err);
        if (err.code_ != "storage/object-not-found") {
          throw err;
        }
      });
    await ctx.dispatch("updateHasImg", { paperId: paperId, hasImg: false });
  }
};
