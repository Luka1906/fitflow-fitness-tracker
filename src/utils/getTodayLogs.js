export default function getTodayLogs(dateString) {
  const logDate = new Date(dateString).toDateString();
  const today = new Date().toDateString();

  return logDate === today;
}
