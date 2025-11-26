
import {useEffect, useState} from "react";

export async function getreservasSalon(user) {
  const res = await fetch(`http://localhost:8000/api/reservas/salones/${user}`);
  return await res.json();
}