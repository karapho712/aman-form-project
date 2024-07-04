export type Negara = {
  id_negara: number;
  kode_negara: string;
  nama_negara: string;
};

export type Pelabuhan = {
  id_pelabuhan: string;
  nama_pelabuhan: string;
  id_negara: string;
};

export type Barang = {
  id_barang: number;
  nama_barang: string;
  id_pelabuhan: number;
  description: string;
  diskon: number;
  harga: number;
};
