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
import { useFetchPelabuhans } from "../../../hooks/useFetchPelabuhan";
import { useFormContext } from "react-hook-form";

export const ComboBoxPelabuhan = ({
  idNegara,
}: {
  idNegara: number;
}) => {
  const formMethods = useFormContext();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const {
    data: pelabuhans,
    isLoading,
    isFetching,
  } = useFetchPelabuhans(idNegara);

  React.useEffect(() => {
    formMethods.setValue("id_pelabuhan", parseInt(value));
  }, [value]);

  if (isLoading || isFetching) return <div>Loading...</div>;

  const datas = pelabuhans.map((pelabuhan) => ({
    id_negara: pelabuhan.id_negara,
    nama_pelabuhan: pelabuhan.nama_pelabuhan,
    id_pelabuhan: pelabuhan.id_pelabuhan,
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
                (pelabuhan) =>
                  pelabuhan.id_pelabuhan === value
              )?.nama_pelabuhan
            : "Select pelabuhan..."}
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
            <CommandEmpty>No pelabuhan found.</CommandEmpty>
            <CommandGroup>
              {datas.map((pelabuhan) => (
                <CommandItem
                  key={pelabuhan.id_pelabuhan}
                  value={pelabuhan.id_pelabuhan}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value
                        ? ""
                        : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {pelabuhan.nama_pelabuhan}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === pelabuhan.id_pelabuhan
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
