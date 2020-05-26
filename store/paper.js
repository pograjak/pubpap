import { firestoreAction } from "vuexfire";

export const state = () => ({
  paper: {},
  imgUrl: ""
});

export const getters = {
  paper: state => state.paper,
  imgUrl: state => state.imgUrl,
  requestPresentation: state => state.paper.requestPresentation,
  isPresentation: state => {
    if (state.paper && state.paper.requestPresentation.bid) {
      return true;
    }
    return false;
  }
};

export const mutations = {
  loadPaper: function(state, { paper, paperId }) {
    // console.log(paper);
    state.paper = paper;
    state.paper["paperId"] = paperId;
  },
  setImgUrl: function(state, url) {
    state.imgUrl = url;
  },
  addUserToFav: function(state, uid) {
    state.paper.favs.push(uid);
  },
  rmUserFromFav: function(state, uid) {
    state.paper.favs = state.paper.favs.filter(function(e) {
      return e != uid;
    });
  }
};

export const actions = {
  addPaper: async function(ctx, pap) {
    return await this.$fireStore.collection("papers").add(pap);
  },
  loadPaper: async function(ctx, paperId) {
    // console.log("LOAD PAPER DISPATCHED");
    let p;

    let pRef = this.$fireStore.collection("papers").doc(paperId);
    p = await pRef.get();
    if (!p.exists) {
      return false;
    }

    ctx.commit("loadPaper", { paper: p.data(), paperId: paperId });
    return true; // HAS TO RETURN TRUE for nuxt validate in pages/paper/_id.vue
  },

  loadImgUrl: async function(ctx, paperId) {
    const imgName = "paper_thumbnails/" + paperId;
    let url;
    let meta;
    url = await this.$fireStorage.ref(imgName).getDownloadURL();
    meta = await this.$fireStorage.ref(imgName).getMetadata();

    ctx.commit("setImgUrl", url);
    return { url: url, meta: meta };
  },

  editFavorites: async function({ commit, state }, paperId) {
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
    if (added) {
      commit("addUserToFav", uid);
    } else {
      commit("rmUserFromFav", uid);
    }
  },

  updateHasImg: async function(ctx, item) {
    let pRef = this.$fireStore.collection("papers").doc(item.paperId);
    console.log("Has IMG update");
    await pRef.set({ hasImg: item.hasImg }, { merge: true });
  },

  uploadThumbnail: async function(ctx, item) {
    if (!item.skipHasImgUpdate) {
      await ctx.dispatch("updateHasImg", {
        paperId: item.paperId,
        hasImg: true
      });
    }

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
