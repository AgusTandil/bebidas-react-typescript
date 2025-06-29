import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
// NAVlINK VIENE CON UN CALLBACK QUE NOS PERMITE DARLE DISTINTOS ESTILOS A LINK DEPENDIENDO DE DONDE ESTEMOS PARADOS. SI ESTAMOS EN INICIO LA PALABRA INICIO SE PONE NARANJA POR EJ.

export default function Header() {
  const { pathname } = useLocation();

  // Esto se ejecuta cada vez que el pathname cambie.
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const { fetchCategories, categories, searchRecipes, showNotification } =
    useAppStore();
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilters).includes("")) {
      showNotification({
        text: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    //CONSULTAMOS RECETAS
    searchRecipes(searchFilters);
  };

  return (
    <header
      className={
        isHome ? "bg-[url('/bg.jpg')] bg-center bg-cover" : "bg-slate-800"
      }
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" alt="logotipo" className="w-32" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4 ">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingredientes
              </label>
              <input
                type="text"
                className="p-3 w-full rounded-lg focus:outline-none bg-slate-200"
                id="ingredient"
                name="ingredient"
                placeholder="Nombre o Ingrediente. Ej vodka, tequila, wisky"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className="space-y-4 ">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoría
              </label>
              <select
                className="p-3 w-full rounded-lg focus:outline-none bg-slate-200"
                id="category"
                name="category"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option>-- Seleccione --</option>
                {categories.drinks.map((category) => (
                  <option
                    value={category.strCategory}
                    key={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar recetas"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
            />
          </form>
        )}
      </div>
    </header>
  );
}
