import { firestoreAction } from "vuexfire";

export const state = () => ({
  threads: [],
  replies: []
});

export const getters = {
  threads: state => state.threads,
  replies: state => state.replies
};

export const mutations = {};

export const actions = {
  bindThreads: firestoreAction(async function ({ bindFirestoreRef }) {
    await bindFirestoreRef(
      "threads",
      this.$fireStore
        .collection("papers")
        .doc("bVypOMp1sZ9I4R0ib5hV")
        .collection("threads")
        .orderBy("votes", "desc")
    );
  }),

  bindReplies: firestoreAction(async function (
    { bindFirestoreRef },
    herethreadId
  ) {
    await bindFirestoreRef(
      "replies",
      this.$fireStore
        .collection("papers")
        .doc("bVypOMp1sZ9I4R0ib5hV")
        .collection("threads")
        .doc(herethreadId)
        .collection("replies")
        .orderBy("createdAt")
    );
  }),

  addThread: async function (context, payload) {
    const thread = {
      text: payload.text,
      title: payload.title,
      votes: 0,
      userId: payload.userId,
      userName: payload.userName,
      createdAt: this.$fireStoreObj.FieldValue.serverTimestamp()
    };

    await this.$fireStore
      .collection("papers")
      .doc("bVypOMp1sZ9I4R0ib5hV")
      .collection("threads")
      .doc()
      .set(thread);
  },

  vote: async function (context, item) {
    // await this.$fireStore
    //   .collection("papers")
    //   .doc("bVypOMp1sZ9I4R0ib5hV")
    //   .collection("threads")
    //   .doc(id)
    //   .update({ upvotes: this.$fireStoreObj.FieldValue.increment(1) });
    var voteRef = this.$fireStore  // add a vote
      .collection("papers")
      .doc("bVypOMp1sZ9I4R0ib5hV")
      .collection("threads")
      .doc(item.threadId)
      .collection('user_votes')
      .doc(item.userId);
    if (item.state != 0) {
      await voteRef.set({ 'v': item.state });
    } else {
      await voteRef.delete();
    }
  },

  addComment: async function (context, obj) {
    const comment = {
      text: obj.text,
      userId: -1,
      createdAt: Date.now(),
      userName: obj.userName
    };

    await this.$fireStore
      .collection("papers")
      .doc("bVypOMp1sZ9I4R0ib5hV")
      .collection("threads")
      .doc(obj.threadId)
      .collection("replies")
      .doc()
      .set(comment);
  }
};
