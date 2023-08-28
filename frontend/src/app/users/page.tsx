"use client"

import UserTable from "@/components/molecules/userTable";
import { UserProvider } from "../../context/userContext";

export default async function Users() {
  return (
    <UserProvider>
      <UserTable />
    </UserProvider>
  );
}
