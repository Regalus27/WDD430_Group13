export const formatPrice = (price: number) => {
    // Requires item prices to be stored in cents.

    if (price < 0) {
        price *= -1;
    }

    return (price / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };