import AppShell from "../../../components/AppShell";
import Page from "../../../components/Page";
import JobForm from "../../../components/JobForm";
export default function NewJob() {
  return (
    <AppShell>
      <Page
        title="Add job"
        subtitle="Capture the details while they are fresh."
      />
      <JobForm />
    </AppShell>
  );
}
