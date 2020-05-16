import { firestoreAction } from "vuexfire";

export const state = () => ({
  paper: {}
});

export const getters = {
  paper: state => state.paper,
  requestPresentation: state => state.paper.requestPresentation
};

export const mutations = {
  loadPaper: function(state, paper) {
    // console.log(paper);
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
        throw "paper does not exist";
      }
    } catch (error) {
      throw error;
    }
    ctx.commit("loadPaper", p.data());
  },

  editFavorites: async function(ctx, item) {
    let pRef = this.$fireStore.collection("papers").doc(item.paperId);
    var setter = null;
    if (item.add) {
      setter = this.$fireStoreObj.FieldValue.arrayUnion(item.userId);
    } else {
      setter = this.$fireStoreObj.FieldValue.arrayRemove(item.userId);
    }
    await pRef.update({ favs: setter });
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
