import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiPelabuhan } from "../api";
import { Pelabuhan } from "../types";

export const useFetchPelabuhans = (idNegara: number) => {
  const filter = encodeURIComponent(
    JSON.stringify({ where: { id_negara: idNegara } })
  );

  return useQuery<Pelabuhan[]>({
    queryKey: ["pelabuhans.id", idNegara],
    queryFn: async () => {
      return await axios
        .get(`${apiPelabuhan}?filter=${filter}`)
        .then((res) => res.data);
    },
    initialData: [
      {
        id_pelabuhan: "0",
        nama_pelabuhan: "Loading",
        id_negara: "Loading",
      },
    ],
    enabled: Boolean(idNegara),
  });
};
