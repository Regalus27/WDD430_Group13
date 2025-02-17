export type Product = {
    product_id: string,
    product_name: string,
    price_in_cents: number,
    category: string,
    description: string,
    image_url: string,
    created_at: Date,
    user_id: string,
    name: string,
};

// export type CardData = {
//     id: string,
//     user_id: string,
//     title: string,
//     price_in_cents: string,
//     category: string,
//     image_url: string,
//     created_at: string,
//     username: string,
// }

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

export type UserProfile = {
    user_profile_id: string;
    user_id: string;
    name: string,
    email: string,
    bio: string;
    image_url: string,
    description: string;
    workshop: string;
    artstyle: string;
    instagram: string;
    facebook: string;
    pinterest: string;
};
