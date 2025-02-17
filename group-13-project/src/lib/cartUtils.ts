export interface CartItem {
    product_id: string;
    product_name: string;
    image_url: string;
    price_in_cents: number;
    Quantity: number;
  }
  
  export const addToCart = (product: CartItem) => {
    if (typeof window === "undefined") return;
  
    const existingCart: CartItem[] = JSON.parse(localStorage.getItem("so-cart") || "[]");
  
    const existingProductIndex = existingCart.findIndex(item => item.product_id === product.product_id);
  
    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].Quantity += 1;
    } else {
      existingCart.push({ ...product, Quantity: 1 });
    }
  
    localStorage.setItem("so-cart", JSON.stringify(existingCart));
  
    alert(`${product.product_name} added to cart!`);
  };
  