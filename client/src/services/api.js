const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export async function api(path, opts = {}) {
  const token =
    typeof window !== "undefined" && localStorage.getItem("jt_token");
  const res = await fetch(base + path, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts.headers,
    },
  });
  const json = await res.json().catch(() => ({ message: "Network error" }));
  if (!res.ok) throw new Error(json.message || "Something went wrong");
  return json.data;
}
