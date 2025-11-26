import imagen from "../images/Meowl.jpeg"
import {useEffect, useState} from "react";

export async function getProductos() {
  const res = await fetch("https://equipo1.ralejandro.com/api/products");
  return await res.json();
}
