
import {useEffect, useState} from "react";

export async function getreservasProducto(user) {
  const res = await fetch(`http://localhost:8000/api/reservas/${user}`);
  return await res.json();
}