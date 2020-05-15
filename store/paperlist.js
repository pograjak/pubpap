import { firestoreAction } from "vuexfire";

export const state = () => ({
  mypapers: []
});

export const getters = {
  mypapers: state => state.mypapers
};

export const mutations = {
  addToMypapers: function(state, pap) {
    state.mypapers.push(pap);
  },
  resetMypapers: function(state) {
    state.mypapers = [];
  }
};

export const actions = {
  loadMyPapers: async function(ctx, userId) {
    let p;
    ctx.commit("resetMypapers");
    try {
      let pRef = this.$fireStore
        .collection("papers")
        .where("authorId", "==", userId);
      p = await pRef.get();
      p.forEach(function(doc) {
        const dat = doc.data();
        dat.id = doc.id;
        ctx.commit("addToMypapers", dat);
      });
    } catch (error) {
      throw error;
    }
  }
};
