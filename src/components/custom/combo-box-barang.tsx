"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFetchBarangs } from "../../../hooks/useFetchBarang";
import { useFormContext } from "react-hook-form";

export const ComboBoxBarang = ({
  idPelabuhan,
}: {
  idPelabuhan: number;
}) => {
  const formMethods = useFormContext();
  const idNegara = formMethods.watch("id_negara");

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const {
    data: barangs,
    isLoading,
    isFetching,
  } = useFetchBarangs(idPelabuhan);

  React.useEffect(() => {
    formMethods.setValue("id_barang", parseInt(value));
  }, [value]);

  React.useEffect(() => {
    setValue("");
  }, [idNegara]);

  if (isLoading || isFetching) return <div>Loading...</div>;

  const datas = barangs.map((barang) => ({
    id_barang: barang.id_barang,
    nama_barang: barang.nama_barang,
    id_pelabuhan: barang.id_pelabuhan,
    description: barang.description,
    diskon: barang.diskon,
    harga: barang.harga,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[500px] justify-between"
        >
          {value
            ? datas.find(
                (barang) =>
                  barang.id_barang.toString() === value
              )?.nama_barang
            : "Select barang..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder="Search barang..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No barang found.</CommandEmpty>
            <CommandGroup>
              {datas.map((barang) => (
                <CommandItem
                  key={barang.id_barang}
                  value={barang.id_barang.toString()}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value
                        ? ""
                        : currentValue
                    );
                    setOpen(false);
                    formMethods.setValue(
                      "description",
                      barang.description
                    );
                    formMethods.setValue(
                      "diskon",
                      barang.diskon
                    );
                    formMethods.setValue(
                      "harga",
                      barang.harga
                    );
                  }}
                >
                  {barang.nama_barang}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === barang.id_barang.toString()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
