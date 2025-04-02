import { makeVar } from "@apollo/client";

// Variable reactiva para el carrito
export const characterVar = makeVar([]);

// Variable reactiva para el usuario
export const filterVar = makeVar(null);
