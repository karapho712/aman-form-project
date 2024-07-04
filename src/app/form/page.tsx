"use client";
import { ComboBoxBarang } from "@/components/custom/combo-box-barang";
import { ComboboxNegara } from "@/components/custom/combo-box-negara";
import { ComboBoxPelabuhan } from "@/components/custom/combo-box-pelabuhan";
import { Input } from "@/components/ui/input";
import { discountPrice } from "@/lib/discount-price";
import { formatNumber } from "@/lib/format-number";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const formMethods = useForm();
  const queryClient = useQueryClient();

  const idNegara = formMethods.watch("id_negara");
  const idPelabuhan = formMethods.watch("id_pelabuhan");
  const idBarang = formMethods.watch("id_barang");

  const onSubmit = (data: any) => {
    data.total = discountPrice(
      formMethods.getValues("harga"),
      formMethods.getValues("diskon")
    );
    console.log(data);
  };

  useEffect(() => {
    console.log(idNegara);
    console.log(idPelabuhan);
    console.log(idBarang);
    console.log(formMethods.watch());

    queryClient.invalidateQueries({
      queryKey: ["barangs.id", idBarang],
    });
    queryClient.invalidateQueries({
      queryKey: ["pelabuhans.id", idPelabuhan],
    });
  }, [idNegara, idPelabuhan, idBarang]);

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div className="px-2 py-2.5 flex items-center">
            <div className="w-32">Negara</div>
            <ComboboxNegara />
          </div>
          <div className="px-2 py-2.5 flex items-center">
            <div className="w-32">Pelabuhan</div>
            <ComboBoxPelabuhan idNegara={idNegara} />
          </div>
          <div className="px-2 py-2.5 flex items-center">
            <div className="w-32">Barang</div>
            <ComboBoxBarang idPelabuhan={idPelabuhan} />
          </div>
          <div className="px-2 py-2.5 flex items-center">
            <div className="mr-4 w-32"></div>
            <Input
              disabled={true}
              type="text"
              placeholder="...."
              defaultValue={"..."}
              className=" w-full"
              {...formMethods.register("description")}
            />
          </div>
          <div className="px-2 py-2.5 flex items-center">
            <div className="mr-4 w-32">Discount</div>
            <Input
              disabled={false}
              type="text"
              placeholder="...."
              className="w-full"
              {...formMethods.register("diskon")}
            />
          </div>
          <div className="px-2 py-2.5 flex items-center">
            <div className="mr-4 w-32">Harga</div>
            <Input
              disabled={false}
              type="number"
              placeholder="...."
              className="w-full"
              {...formMethods.register("harga")}
            />
          </div>
          <div className="px-2 py-2.5 flex items-center">
            <div className="mr-4 w-32">Total</div>
            <Input
              disabled={true}
              type="text"
              placeholder="...."
              className="w-full"
              value={formatNumber(
                discountPrice(
                  formMethods.getValues("harga"),
                  formMethods.getValues("diskon")
                )
              )}
            />
          </div>
          <div className="px-2 py-2.5 flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Page;
