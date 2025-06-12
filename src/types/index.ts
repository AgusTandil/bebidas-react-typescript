import { z } from "zod";
import {
  CategoriesAPIResponseSchema,
  DrinkAPIResponseSchema,
  DrinksAPIResponseSchema,
  RecipeAPIResponseSchema,
  SeachFilterSchema,
} from "../schemas/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SeachFilterSchema>;
export type Drinks = z.infer<typeof DrinksAPIResponseSchema>;
export type Drink = z.infer<typeof DrinkAPIResponseSchema>;
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>;
