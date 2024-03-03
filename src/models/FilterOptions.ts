interface FilterOptions {
    gender: string, 
    showActiveOnly: boolean, 
    ageRange: [number, number], 
    startDate: Date, 
    endDate: Date
}

interface FilterProps {
    updateFilters: (filters: FilterOptions) => void;
    currentFilters: FilterOptions
}

export type { FilterOptions, FilterProps }
