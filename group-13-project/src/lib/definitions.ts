export type Product = {
    product_id: string;
    user_id: string;
    product_name: string;
    price_in_cents: number;
    category: string;
    description: string;
    image_url: string;
    created_at: Date;
};

export type Review = {
    review_id: string;
    user_id: string;
    product_id: string;
    review_text: string;
    review_rating: number;
};

export type User = {
    user_id: string;
    username: string;
    email: string;
    password: string;
    profile_picture_path: string;
};

export type CreatorField = {
    user_id: string;
    name: string;
};

export type ProfileForm = {
    user_id: string;
    bio: string;
    description: string;
    artstyle: string;
    instagram: string;
    facebook: string;
    pinterest: string;
};
export type UserProfile = {
    user_profile_id: string;
    user_id: string;
    name: string,
    email: string,
    image_url: string,
    bio: string;
    description: string;
    artstyle: string;
    instagram: string;
    facebook: string;
    pinterest: string;
};
