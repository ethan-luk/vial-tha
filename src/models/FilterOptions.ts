interface FilterOptions {
    gender: string, 
    showActiveOnly: boolean, 
    ageRange: [number, number], 
    startDate: Date, 
    endDate: Date
}

export default FilterOptions