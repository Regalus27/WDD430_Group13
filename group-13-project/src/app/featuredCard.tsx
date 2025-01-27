import { formatPrice } from '@/lib/utils';

export default function FeaturedCard({
    itemPicture,
    itemAltText,
    itemPrice,
    itemPageLink,
} : {
    itemPicture: string,    // Path to item picture
    itemAltText: string,    // Needs to exist
    itemPrice: number,      // Set up utility function to format item price
    itemPageLink: string    // Set up Link Validation? On a future page, validation for creating items
}) {
    return (
        <a className="group black relative overflow-hidden rounded-lg" href={itemPageLink}>
            <figure className="relative w-full h-full">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src={itemPicture} alt={itemAltText}></img>
                <figcaption className="absolute bottom-1/8 left-2/4 flex w-[calc(100%)] -translate-x-2/4 justify-center border border-white bg-white/75 py-1 px-6 shadow-lg shadow-black/5 saturate-200">
                    <h5>{formatPrice(itemPrice)}</h5>
                </figcaption>
            </figure>
        </a>
    )
}