
import {useEffect, useState} from "react";

export async function getUsers() {
  const res = await fetch("http://localhost:8000/api/users");
  return await res.json();
}