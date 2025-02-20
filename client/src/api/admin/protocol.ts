export const ADMIN_API_PORTOCAL = () => {
  return {
    CHECK_ADMIN: "/admin/check",

    CREATE_SONG: "/admin/song",
    UPDATE_SONG: (id: string) => `/admin/song/${id}`,
    DELETE_SONG: (id: string) => `/admin/song/${id}`,

    CREATE_ALBUM: "/admin/album",
    DELETE_ALBUM: (id: string) => `/admin/album/${id}`,
  };
};
