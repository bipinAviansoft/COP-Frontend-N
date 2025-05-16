import Cookies from "js-cookie";

const getJwtToken = () => {
  return Cookies.get("jwt") || "";
};

export const sendRequest = async (endpoint, body, method = "POST") => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${endpoint}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  const data = await response.json(); // Read response body only once

  if (!response.ok) {
    const { message } = data;
    throw new Error(message || `Send OTP | API Failed!`);
  }

  return data;
};

export const fetchDataClient = async (endpoint) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${endpoint}`,
    {
      credentials: "include",
    }
  );

  const data = await response.json(); // Read response body only once

  if (!response.ok) {
    const { message } = data;
    throw new Error(message || `${endpoint} | API Failed!`);
  }

  return data;
};

export const sendFuelRequest = async (endpoint, body, method = "POST") => {
  const token = getJwtToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${endpoint}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `${token}` : undefined,
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  const data = await response.json(); // Read response body only once

  if (!response.ok) {
    const { message } = data;
    throw new Error(message || `API Failed!`);
  }

  return data;
};
