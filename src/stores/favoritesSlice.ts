import type { StateCreator } from "zustand";
import type { Recipe } from "../types";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => {
        const updatedFavorites = state.favorites.filter(
          (fav) => fav.idDrink !== recipe.idDrink
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return { favorites: updatedFavorites };
      });

      createNotificationSlice(set, get).showNotification({
        text: "Se eliminó de favoritos",
        error: false,
      });
    } else {
      set((state) => {
        const updatedFavorites = [...state.favorites, recipe];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return { favorites: updatedFavorites };
      });
      createNotificationSlice(set, get).showNotification({
        text: "Se agregó a favoritos",
        error: false,
      });
    }
  },
  favoriteExist: (id) => {
    return get().favorites.some((favorites) => favorites.idDrink === id);
  },
  loadFromStorage: () => {
    const storeFavorites = localStorage.getItem("favorites");

    if (storeFavorites) {
      set({
        favorites: JSON.parse(storeFavorites),
      });
    }
  },
});
