import UserCardsSection from "./UserCardsSection";

export default function UserCard({ customerDetails }) {
  return (
    <div>
      <UserCardsSection customerDetails={customerDetails} />
    </div>
  );
}
