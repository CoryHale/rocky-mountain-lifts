import axios from "axios";
import { auth } from "../firebase";

export default async function () {
  const token = await auth.currentUser.getIdToken();

  return axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
