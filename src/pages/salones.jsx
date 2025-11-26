import imagen2 from "../images/jay.jpg"
import {useEffect, useState} from "react";

export async function getSalones() {
  const res = await fetch("http://localhost:8000/api/rooms");
  return await res.json();
}


