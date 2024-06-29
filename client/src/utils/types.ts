export type ReactType = {};

export type CommentType = {};

export type PostType = {
  author: {
    id: string;
    name: string;
    profilePicture: string;
    username: string;
    authorId: string;
  };
  comments: CommentType[];
  description: string;
  id: string;
  picture: string | null;
  reacts: ReactType[];
  steps: number;
  timeCreated: string;
};

export type ProfileInfoType = {
    profilePicture: string,
    username: string,
    name: string,
    description: string | null
}