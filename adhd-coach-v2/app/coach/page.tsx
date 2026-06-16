import { PageHeader } from "@/components/layout/page-header";
import { CoachPanel } from "@/components/coach/coach-panel";

export default function CoachPage() {
  return (
    <>
      <PageHeader badge="Coach quotidiano" title="Coach AI"
        description="Supporto pratico e non clinico per organizzare la giornata, iniziare attività e ridurre distrazioni." />
      <CoachPanel />
    </>
  );
}
