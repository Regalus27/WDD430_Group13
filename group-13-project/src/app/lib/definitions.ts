export type User = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  password: string;
};

export type UserProfile = {
  user_id: string;
  bio: string;
  description: string;
  workshop: string;
  artStyle: string;
  instagram: string;
  facebook: string;
  pinterest: string;
};

export type FormattedUseProfileTable = {
  name: string;
  email: string;
  image_url: string;
  password: string;
  user_id: string;
  bio: string;
  description: string;
  workshop: string;
  artStyle: string;
  instagram: string;
  facebook: string;
  pinterest: string;
};
