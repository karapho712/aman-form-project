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
import { useFetchNegaras } from "../../../hooks/useFetchNegara";
import { useFormContext } from "react-hook-form";

export const ComboboxNegara = () => {
  const formMethods = useFormContext();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("0");
  const {
    data: negaras,
    isLoading,
    isFetching,
  } = useFetchNegaras();

  React.useEffect(() => {
    formMethods.setValue("id_negara", parseInt(value));
  }, [value]);

  if (isLoading || isFetching) return <div>Loading...</div>;

  const datas = negaras.map((negara) => ({
    id_negara: negara.id_negara,
    nama_negara: negara.nama_negara,
    kode_negara: negara.kode_negara,
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
                (negara) =>
                  negara.id_negara.toString() === value
              )?.nama_negara
            : "Select negara..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder="Search negara..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No negara found.</CommandEmpty>
            <CommandGroup>
              {datas.map((negara) => (
                <CommandItem
                  key={negara.id_negara}
                  value={negara.id_negara.toString()}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value
                        ? ""
                        : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {negara.nama_negara}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === negara.id_negara.toString()
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
