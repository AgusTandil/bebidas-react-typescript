import type { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipesService"
import type { Categories, Drinks, SearchFilter } from "../types"
 

 export type RecipesSliceType = {
    categories:Categories,
    drinks:Drinks
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilter:SearchFilter) => Promise<void>
 }
export const createRecipesSlice : StateCreator<RecipesSliceType> = (set)=> ({
    categories:{
        drinks:[]
    },
    drinks:{
        drinks:[]
    },
    fetchCategories:async ()=> {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (SearchFilters)=>{
        const drinks = await getRecipes(SearchFilters)
        set({
            drinks
        })
    }
})