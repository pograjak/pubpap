import { firestoreAction } from "vuexfire";

export const state = () => ({
  threads: []
});

export const getters = {
  threads: state => state.threads
};

export const mutations = {};

export const actions = {
  bindThreads: firestoreAction(async function({ bindFirestoreRef }) {
    await bindFirestoreRef(
      "threads",
      this.$fireStore
        .collection("papers")
        .doc("bVypOMp1sZ9I4R0ib5hV")
        .collection("threads")
    );
  })
  ,
  addThread: async function(context, payload) {
    const thread={
      text: payload.text,
      title: payload.title,
      upvotes: 0,
      userId: -1
    }

    await this.$fireStore
      .collection("papers")
      .doc("bVypOMp1sZ9I4R0ib5hV")
      .collection("threads")
      .doc()
      .set(thread)
  },
  upvote: async function(context, id) {
    await this.$fireStore
      .collection("papers")
      .doc("bVypOMp1sZ9I4R0ib5hV")
      .collection("threads")
      .doc(id)
      .update({upvotes : this.$fireStoreObj.FieldValue.increment(1)});
  },
  downvote: async function(context, id) {
    await this.$fireStore
      .collection("papers")
      .doc("bVypOMp1sZ9I4R0ib5hV")
      .collection("threads")
      .doc(id)
      .update({upvotes : this.$fireStoreObj.FieldValue.increment(-1)});
  },

};
