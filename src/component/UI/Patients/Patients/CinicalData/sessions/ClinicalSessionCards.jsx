import ClinicalSessionCard from "./ClinicalSessionCard";

function ClinicalSessionCards() {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
      <ClinicalSessionCard></ClinicalSessionCard>
      <ClinicalSessionCard></ClinicalSessionCard>
      <ClinicalSessionCard></ClinicalSessionCard>
    </div>
  );
}

export default ClinicalSessionCards;
