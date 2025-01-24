export const ALBUM_API_PORTOCAL = () => {
  return {
    GET_ALBUM: `/album`,
    GET_ALBUM_BY_ID: (id: string) => `/album/${id}`,
  };
};
