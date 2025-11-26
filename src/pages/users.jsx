
import {useEffect, useState} from "react";

export async function getUsers() {
  const res = await fetch("https://equipo1.ralejandro.com/api/users");
  return await res.json();
}