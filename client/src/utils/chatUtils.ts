export function getTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return ` at ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  return ` on ${date.toLocaleDateString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })} at ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

   
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
   

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split.length > 0 ? name[0].toUpperCase() : ''}${name.split.length > 1 ? name[1][0].toUpperCase() : ''}`,
  };
}