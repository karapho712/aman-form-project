import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiNegara } from "../api";
import { Negara } from "../types";

export const useFetchNegaras = () => {
  return useQuery<Negara[]>({
    queryKey: ["negaras"],
    queryFn: async () => {
      return await axios
        .get(`${apiNegara}`)
        .then((res) => res.data);
    },
    initialData: [
      {
        id_negara: 0,
        kode_negara: "0",
        nama_negara: "Loading",
      },
    ],
  });
};
