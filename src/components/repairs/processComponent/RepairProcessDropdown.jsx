import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { createBrand } from "../../../../service/brandApi";
import useFetchBrands from "../../../hooks/useFetchBrands";
import { toast } from "react-toastify";
import useFetchRepairProcesses from "../../../hooks/useFetchRepairProcesses";

const RepairProcessDropdown = ({ formData, setFormData }) => {
  const [query, setQuery] = useState("");

  useFetchRepairProcesses();

  const processes = useSelector((store) => store.repairProcesses.allProcesses);
  console.log("Repair processes repairdropdown", processes)

  const filteredProcesses =
    query === ""
      ? processes
      : processes.filter((p) =>
          p.processName?.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>RepairProcessDropdown</div>
  )
}

export default RepairProcessDropdown;