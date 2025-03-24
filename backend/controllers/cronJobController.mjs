import CronJob from '../models/CronJob.mjs';
import fetch from 'node-fetch';

export async function getCronJobStatus(req, res) {
  const { access_token, job_name } = req.query;

  if (!access_token || !job_name) {
    return res.status(400).json({ error: 'Missing access_token or job_name' });
  }

  // Verify GitHub token validity
  const ghRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  if (!ghRes.ok) {
    return res.status(401).json({ error: 'Invalid GitHub token' });
  }

  // Fetch job status
  const job = await CronJob.findByPk(job_name);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  return res.json({ job_name: job.job_name, job_status: job.job_status });
}
