export function formatTime(time: number, place: number = 3) {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60 - hours * 60);
  const seconds = time % 60;
  if (place === 3)
    return `${hours.toString()}h ${minutes
      .toString()
      .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  else
    return `${minutes.toString().padStart(2, "0")}m ${seconds
      .toString()
      .padStart(2, "0")}s`;
}
