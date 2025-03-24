import { useCronJobCurrentStatus } from "../../../hooks/useCronJobCurrentStatus";
import "./styles.css"; // Make sure to import the styles

export default function RepoStatsStatusChecker({
  job_name,
}: {
  job_name: string;
}) {
  const [running] = useCronJobCurrentStatus(job_name);

  if (running === null)
    return <div className="pulsating">Checking repo stats status...</div>;

  return (
    <div
      className={running ? "pulsating" : ""}
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      {running ? "🔄 Processing repository stats..." : "✅ Data Complete"}
      {running === false && (
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "green",
            padding: "4px",
          }}
          onClick={() => window.location.reload()}
        >
          Refresh Page 🔄
        </button>
      )}
    </div>
  );
}
