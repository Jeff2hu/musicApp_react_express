export type AuthCallBackRequest = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
};

export type AuthCallbackResponse = {
  clerkId: string;
  createdAt: string;
  fullName: string;
  imageUrl: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
