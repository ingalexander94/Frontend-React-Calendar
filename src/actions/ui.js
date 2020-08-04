import { types } from "../types/types";

export const openModals = () => ({
  type: types.openModal,
});

export const closeModals = () => ({
  type: types.closeModal,
});

export const startLoading = () => ({
  type: types.startLoading,
});

export const finishLoading = () => ({
  type: types.finishLoading,
});
