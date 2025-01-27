export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if(isNaN(date.getTime())){return "Invalid Date"};

  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: 'numeric',
  });
}