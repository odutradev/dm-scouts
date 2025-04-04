import { useState } from "react";

import GoBackButton from "@components/goBackButton";
import UserNavbar from "@components/userNavbar";
import Layout from "@components/layout";

import type  { UserModelType } from "@utils/types/models/user";
import useMountOnce from "@hooks/useMountOnce";
import { getAllUsers } from "@actions/admin";

const Users = () => {
  const [users, setUsers] = useState<UserModelType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useMountOnce(async () => {
    setLoading(true);
    const data = await getAllUsers();
    if (!('error' in data)){
      setUsers(data);
    };
    setLoading(false);
  });

  return (
    <Layout title="Usuarios" isLoading={loading}>
      <GoBackButton />
      <UserNavbar />

    </Layout>
  );
};

export default Users;
