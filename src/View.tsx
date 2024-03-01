import { useState, useEffect } from "react";
import SubjectTable from "./SubjectTable"
import Subject from './models/SubjectInfo';
import { DatePickerInput } from "@mantine/dates";
import FilterButton from "./components/FilterButton";


const View = () => {

    const [subjects, setSubjects] = useState<Subject[]>([])
    const [filters, setFilters] = useState({
      gender: '',
      showActiveOnly: false,
      startDate: new Date('0000-01-01T00:00:00.000Z'),
      endDate: new Date('9999-12-31T23:59:59.999Z')
    });
  
    // Fetch Data from Endpoint
    useEffect(() => {
      const fetchData = async () => {
        try {
  
          const response = await fetch('https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects');
          const result = (await response.json()).data as Subject[]
  
          console.log(result)
          setSubjects(result);
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    const updateFilters = (filters: {gender: string, showActiveOnly: boolean, startDate: Date, endDate: Date}) => {
        setFilters(filters)
    }
    
      const handleStartDateChange = (newStartDate: Date | null) => {
        const startDateToUse = newStartDate || new Date('0000-01-01T00:00:00.000Z');
        setFilters({
          ...filters,
          startDate: startDateToUse
        })
      }
    
      const handleEndDateChange = (newEndDate: Date | null) => {
        const endDateToUse = newEndDate || new Date('9999-12-31T23:59:59.999Z');
        setFilters({
          ...filters,
          endDate: endDateToUse
        })
      }
    
    const filteredData = subjects.filter(item => {
        return (
            (filters.gender === '' || item.gender === filters.gender) &&
            (!filters.showActiveOnly || item.status === 'Active') &&
            (filters.startDate < new Date(item.diagnosisDate)) && 
            (filters.endDate > new Date(item.diagnosisDate))
        );
    });
    
    return (
        <>
            <FilterButton updateFilters={updateFilters} initialFilters={filters}/>

            
            <DatePickerInput label="Start Date"
                            placeholder="Start Date"
                            onChange={handleStartDateChange} />
            
            <DatePickerInput label="End Date"
                            placeholder="End Date"
                            onChange={handleEndDateChange} />
            
            <SubjectTable subjectData={filteredData}/>
        </>
    )
}

export default View