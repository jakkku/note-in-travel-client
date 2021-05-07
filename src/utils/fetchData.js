import { API_SERVER_URL } from "@env";

async function fetchData(method, url, data) {
  try {
    let response = await fetch(`${API_SERVER_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    response = await response.json();

    if (response.ok) {
      return response.data;
    }

    throw new Error(response.error.message);
  } catch (err) {
    throw new Error(err.message);
  }
}

export default fetchData;
