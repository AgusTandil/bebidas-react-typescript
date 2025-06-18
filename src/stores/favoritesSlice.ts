import type { StateCreator } from "zustand";
import type { Recipe } from "../types";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExist:(id:Recipe['idDrink'])=> boolean
  loadFromStorage:()=> void
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (
      get().favoriteExist(recipe.idDrink)
    ) {
      set((state) => {
        const updatedFavorites = state.favorites.filter(
          (fav) => fav.idDrink !== recipe.idDrink
        );
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return { favorites: updatedFavorites };
      });

    } else {
      set((state) => {
        const updatedFavorites = [...state.favorites, recipe];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return { favorites: updatedFavorites };
      });
    }
  },
  favoriteExist:(id)=> {

    return get().favorites.some((favorites) => favorites.idDrink === id)
  },
  loadFromStorage:()=> {
    const storeFavorites = localStorage.getItem('favorites')

    if(storeFavorites){
        set({
            favorites:JSON.parse(storeFavorites)
        })
    }
  }
});
