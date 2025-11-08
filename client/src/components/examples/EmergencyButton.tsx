import EmergencyButton from "../EmergencyButton";

export default function EmergencyButtonExample() {
  return (
    <div className="p-6 max-w-2xl">
      <EmergencyButton
        number="999"
        label="Police Emergency"
        description="For immediate emergency assistance"
      />
    </div>
  );
}
