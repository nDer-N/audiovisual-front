
import {useEffect, useState} from "react";

export async function getreservasSalon(user) {
  const res = await fetch(`https://equipo1.ralejandro.com/api/reservas/salones/${user}`);
  return await res.json();
}