// Display price from database data
export const formatPrice = (price: number) => {
    // Store item prices as cents
    if (price < 0) {
        price *= -1;
    }

    return (price / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};

// Convert form price data to database format
export const convertToActualPriceInCents = (price: number) => {
    return Math.round(price * 100);
};