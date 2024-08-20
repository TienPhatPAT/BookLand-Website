export function fetchApi(url) {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => data);
}

export function getApiEnv() {
  return import.meta.env.VITE_API;
}
