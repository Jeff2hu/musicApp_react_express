export const USER_API_PORTOCAL = () => {
  return {
    AUTH_CALLBACK: "/auth/callback",
    GET_USER: (id: string) => `/user/${id}`,
  };
};
