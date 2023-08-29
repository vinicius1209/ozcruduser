export const listUsers = async (page: number, pageSize: number) => {
  const res = await fetch(
    `http://localhost:3000/users?page=${page}&pageSize=${pageSize}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users data");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return res.json();
};

export const deleteUser = async (userId: number) => {
  const res = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch delete user");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return res.json();
};

export const editUser = async (
  userId: number,
  nome: string,
  email: string,
  idade: string
) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, idade }),
  };

  const res = await fetch(
    `http://localhost:3000/users/${userId}`,
    requestOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch put user");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return res.json();
};

export const newUser = async (
  nome: string,
  email: string,
  idade: string
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, idade }),
  };

  const res = await fetch(
    `http://localhost:3000/users`,
    requestOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post user");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return res.json();
};
