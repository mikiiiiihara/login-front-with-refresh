import { useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import router from "next/router";
import { useEffect } from "react";
import { HOOKS_STATE } from "../constants/hooks-state";
import { GET_USER, LOGIN } from "../pages/api/graphql";
import { Token } from "../types/token";
import { User } from "../types/user";

export const useAuth = () => {
  const { data: meData, loading, refetch } = useQuery(GET_USER);
  // 取得関数
  const getUser = () => {
    const user: User = meData?.user;
    if (loading) return { user: HOOKS_STATE.LOADING };
    return { user };
  };
  const [login, { data }] = useMutation<{
    login: Token;
  }>(LOGIN);
  const requestLogin = async () => {
    await login();
    await refetch();
  };
  useEffect(() => {
    if (!data) return;

    const { accessToken, refreshToken } = data.login;

    // Save tokens in cookie
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  }, [data]);

  const logout = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    // ページをリロード
    router.push("/login");
  };
  return {
    getUser,
    requestLogin,
    logout,
  };
};
