export const convertTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
};

export const convertToMilliseconds = (
  hours: number,
  minutes: number,
  seconds: number,
) => hours * (3600 * 1000) + minutes * (60 * 1000) + seconds * 1000;
