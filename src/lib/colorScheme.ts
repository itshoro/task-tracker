function setPersistedColorScheme() {
  const persistedValue = localStorage.getItem("theme") ?? "system";

  const prefersDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const prefersDark =
    persistedValue === "dark" ||
    (persistedValue === "system" && prefersDarkQuery.matches);

  if (prefersDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return prefersDarkQuery;
}

export { setPersistedColorScheme };
