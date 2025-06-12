import type { Drink } from "../types";
import { useAppStore } from "../stores/useAppStore";
type DrinkCardProps = {
  drink: Drink;
};
export default function DrinkCard({ drink }: DrinkCardProps) {

  const {selectRecipe} = useAppStore()

 
  return (
    <div className=" shadow-lg">
      <div className="">
        <img src={drink.strDrinkThumb} alt="Imagen del trago" className="hover:scale-75 transition-transform"/>
      </div>
      <div className="p-5 ">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer"
          onClick={()=> selectRecipe(drink.idDrink)}
        >Ver Receta</button>
      </div>
    </div>
  );
}
