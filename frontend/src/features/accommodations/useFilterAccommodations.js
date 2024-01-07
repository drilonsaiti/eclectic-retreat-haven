import { useSearchParams } from 'react-router-dom';

export function useFilterAccommodations(accommodations) {
    const [searchParams] = useSearchParams();
    const filterDiscount = searchParams.get('discount') || 'all';
    const filterTypes = searchParams.get('types') || 'all';

    console.log(accommodations);

    const filteredAccommodations = accommodations.filter((accm) => {
        const typeCondition =
            filterTypes === 'all' || accm.types === filterTypes.toUpperCase();

        const discountCondition =
            filterDiscount === 'all' ||
            (filterDiscount === 'no-discount' && accm.discount === 0) ||
            (filterDiscount === 'with-discount' && accm.discount > 0);

        return typeCondition;
    });

    return filteredAccommodations.length !== 0 ? filteredAccommodations : accommodations;
}
