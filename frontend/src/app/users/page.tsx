"use client";

import { UserProvider } from "../../context/userContext";
import { Container } from "@mui/material";
import UserView from "@/components/organisms/userView";

export default function Users() {
  return (
    <UserProvider>
      <Container>
        <UserView />
      </Container>
    </UserProvider>
  );
}
