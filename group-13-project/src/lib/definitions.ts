export type User = {
  user_id: string;
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
  artstyle: string;
  instagram: string;
  facebook: string;
  pinterest: string;
};

export type UserProfileRaw = {
  user_id: string;
  name: string;
  email: string;
  image_url: string;
  bio: string;
  description: string;
  artstyle: string;
  instagram: string;
  facebook: string;
  pinterest: string;
};
