import Cookies from "js-cookie";

const getJwtToken = () => {
  return Cookies.get("jwt") || "";
};

export const sendRequest = async (endpoint, body, method = "POST") => {
  console.log(endpoint);
  console.log(body);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${endpoint}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        Origin: `${process.env.NEXT_SITE_URL}`,
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    const { message } = error;
    throw new Error(message || `Send OTP | API Failed!`);
  }

  const data = await response.json();
  return data;
};

export const fetchDataClient = async (endpoint) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${endpoint}`,
    {
      headers: {
        Origin: `${process.env.NEXT_SITE_URL}`,
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    const { message } = error;
    throw new Error(message || `${endpoint} | API Failed!`);
  }

  const data = await response.json();
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
        Origin: `${process.env.NEXT_SITE_URL}`,
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    const { message } = error;
    throw new Error(message || `API Failed!`);
  }

  const data = await response.json();
  return data;
};
