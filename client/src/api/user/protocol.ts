export const USER_API_PORTOCAL = () => {
  return {
    AUTH_CALLBACK: "/auth/callback",
    GET_ALL_USERS: "/user",
    GET_USER: (id: string) => `/user/${id}`,
  };
};
