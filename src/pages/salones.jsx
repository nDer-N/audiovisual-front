import imagen2 from "../images/jay.jpg"
import {useEffect, useState} from "react";

export async function getSalones() {
  const res = await fetch("https://equipo1.ralejandro.com/api/rooms");
  return await res.json();
}


