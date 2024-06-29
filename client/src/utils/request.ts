const request = async (
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: Record<string, any>,
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3030";
  const url = `${baseUrl}${path}`;

  const payload =
    method === "GET"
      ? {
          method,
          credentials: "include",
        }
      : {
          method,
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(options),
        };
  try {
    // @ts-ignore
    const res: any = await fetch(url, { ...payload, cache: "no-store" });
    if (!res.ok) {
      return { errorCode: res.status, errorMessage: res.statusText };
    }
    return await res.json();
  } catch (err) {
    return { errorCode: "500", errorMessage: "Uh oh! Something's wrong!" };
  }
};

export const get = (
  path: string,
  options?: Record<string, any>
) => request(path, "GET", options);

export const post = (
  path: string,
  options?: Record<string, any>
) => request(path, "POST", options);

export const put = (
  path: string,
  options?: Record<string, any>
) => request(path, "PUT", options);

export const del = (
  path: string,
  options?: Record<string, any>
) => request(path, "DELETE", options);
