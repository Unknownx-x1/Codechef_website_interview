import { ClubInfo } from "@/components/ClubInfo";
import { PageTransition } from "@/components/PageTransition";

export default function ClubPage() {
  return (
    <PageTransition>
      <div className="pt-24 min-h-screen">
        <ClubInfo />
      </div>
    </PageTransition>
  );
}
