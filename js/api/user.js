export const updateEmailCall = async ({ email, url }) => {
  const res = await fetch(`${url}/user/email`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage
        .getItem("token")
        ?.replace(/"/g, "")}`,
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  return data;
};

export const updatePasswordCall = async ({ password, url }) => {
  const res = await fetch(`${url}/user/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage
        .getItem("token")
        ?.replace(/"/g, "")}`,
    },
    body: JSON.stringify({ password }),
  });

  const data = await res.json();
  return data;
};
