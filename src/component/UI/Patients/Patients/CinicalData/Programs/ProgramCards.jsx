import { useState } from "react";
import ProgramCard from "./ProgramCard";

const ProgramCards = () => {
  const [selectProgram, setSelectProgram] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  const handleSelectProgram = (e) => {
    console.log("E", e);
    setSelectProgram(!selectProgram);
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
      <ProgramCard
        selectProgram={selectProgram}
        handleSelectProgram={handleSelectProgram}
      ></ProgramCard>
    </div>
  );
};

export default ProgramCards;
