import { firestoreAction } from "vuexfire";

export const state = () => ({
  modal: false
});

export const getters = {
  modalState: state => state.modal
};

export const mutations = {
  closeModal: state => (state.modal = false),
  openModal: state => (state.modal = true),
  updateModalState: (state, value) => (state.modal = value)
};

export const actions = {
  updateModalState: (ctx, value) => ctx.commit("updateModalState", value),
  closeModal: ctx => {
    ctx.commit("closeModal");
  },
  openModal: ctx => {
    ctx.commit("openModal");
  }
};
