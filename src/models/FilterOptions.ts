interface FilterOptions {
    gender: string, 
    showActiveOnly: boolean, 
    ageRange: [number, number], 
    startDate: Date, 
    endDate: Date
    searchText: string
}

interface FilterProps {
    updateFilters: (filters: FilterOptions) => void;
    updateActiveFilters?: ((activeFilters: { [key: string]: string }[]) => void) | undefined;
    currentFilters: FilterOptions
    activeFilters?: { [key: string]: string }[] | undefined;
}

export type { FilterOptions, FilterProps }
