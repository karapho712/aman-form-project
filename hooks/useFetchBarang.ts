import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiBarang } from "../api";
import { Barang } from "../types";

export const useFetchBarangs = (idPelabuhan: number) => {
  const filter = encodeURIComponent(
    JSON.stringify({ where: { id_pelabuhan: idPelabuhan } })
  );

  return useQuery<Barang[]>({
    queryKey: ["barangs.id", idPelabuhan],
    queryFn: async () => {
      return await axios
        .get(`${apiBarang}?filter=${filter}`)
        .then((res) => res.data);
    },
    initialData: [
      {
        id_barang: 0,
        nama_barang: "Loading",
        id_pelabuhan: 0,
        description: "Loading",
        diskon: 0,
        harga: 999999,
      },
    ],
    enabled: Boolean(idPelabuhan),
  });
};
