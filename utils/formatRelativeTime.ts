const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const delta = now - timestamp * 1000;

  const minutes = Math.floor(delta / 60000);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(delta / 3600000);
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const date = new Date(timestamp * 1000);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

export default formatRelativeTime;
