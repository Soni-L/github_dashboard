import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export function useCronJobCurrentStatus(job_name: string) {
  const [value] = useLocalStorage("github_access_token", 0);
  const [running, setRunning] = useState<boolean | null>(null);

  useEffect(() => {
    if (!job_name) return;
    // @ts-nocheck
    // eslint-disable-next-line
    let intervalId: any;
    let isMounted = true;

    const fetchStatus = async () => {
      try {
        const token = value;
        if (!token) {
          console.error("No GitHub token found in localStorage");
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/getCronJobStatus?access_token=${token}&job_name=${job_name}`
        );
        const data = await response.json();

        if (!isMounted) return;

        if (data.job_status === "RUNNING") {
          setRunning(true);
        } else if (data.job_status === "RUN_COMPLETE") {
          setRunning(false);
          if (intervalId) clearInterval(intervalId); // stop polling
        }
      } catch (err) {
        console.error("Failed to fetch cron job status:", err);
      }
    };

    // Initial fetch
    fetchStatus();

    // Poll if running
    intervalId = setInterval(fetchStatus, 3000);

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [job_name, value]);

  return [running] as const;
}
