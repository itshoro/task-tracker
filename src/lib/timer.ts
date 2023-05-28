function msToHMS(ms: number) {
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);

  return {
    hours,
    minutes,
    seconds,
  };
}

export { msToHMS };
