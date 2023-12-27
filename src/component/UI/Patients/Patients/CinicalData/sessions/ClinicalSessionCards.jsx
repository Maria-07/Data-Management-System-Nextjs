import ClinicalSessionCard from "./ClinicalSessionCard";

function ClinicalSessionCards() {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-3">
      <ClinicalSessionCard></ClinicalSessionCard>
      <ClinicalSessionCard></ClinicalSessionCard>
      <ClinicalSessionCard></ClinicalSessionCard>
      <ClinicalSessionCard></ClinicalSessionCard>
      <ClinicalSessionCard></ClinicalSessionCard>
      <ClinicalSessionCard></ClinicalSessionCard>
      <ClinicalSessionCard></ClinicalSessionCard>
      <ClinicalSessionCard></ClinicalSessionCard>
      <ClinicalSessionCard></ClinicalSessionCard>
    </div>
  );
}

export default ClinicalSessionCards;
