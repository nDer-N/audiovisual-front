
import {useEffect, useState} from "react";

export async function getreservasProducto(user) {
  const res = await fetch(`https://equipo1.ralejandro.com/api/reservas/${user}`);
  return await res.json();
}