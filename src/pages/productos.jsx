import imagen from "../images/Meowl.jpeg"
import {useEffect, useState} from "react";

export async function getProductos() {
  const res = await fetch("http://localhost:8000/api/products");
  return await res.json();
}
