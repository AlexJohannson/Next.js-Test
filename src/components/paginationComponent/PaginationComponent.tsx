'use client';
import { useSearchParams, usePathname } from 'next/navigation';

const PaginationComponent = ({ onPageChange }: { onPageChange: (page: number) => void }) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = Number(searchParams.get('page')) || 1;

    const handlePrevious = () => {

        if (currentPage > 1) {
            const newPage = currentPage - 1;
            const newParams = new URLSearchParams(searchParams);
            newParams.set('page', newPage.toString());
            window.history.pushState({}, '', `${pathname}?${newParams.toString()}`);
            onPageChange(newPage);
        }
    };

    const handleNext = () => {

        const newPage = currentPage + 1;
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage.toString());
        window.history.pushState({}, '', `${pathname}?${newParams.toString()}`);
        onPageChange(newPage);
    };

    return (
        <div>
            <button className={'previous'} onClick={handlePrevious}>PREVIOUS</button>
            <button className={'next'} onClick={handleNext}>NEXT</button>
        </div>
    );
};

export default PaginationComponent;
