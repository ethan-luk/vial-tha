import { useState, useEffect } from "react";
import SubjectTable from "./components/SubjectTable"
import Subject from './models/SubjectInfo';
import FilterButton from "./components/FilterMap";
import { Grid } from "@mantine/core";
import SubjectInfo from "./models/SubjectInfo";
import FilterOptions from "./models/FilterOptions";


const View = () => {

    const [subjects, setSubjects] = useState<Subject[]>([])
    const [filters, setFilters] = useState<FilterOptions>({
      gender: '',
      showActiveOnly: false,
      ageRange: [0, Number.MAX_VALUE],
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

    const handleSort = (newSort: SubjectInfo[]) => {
        setSubjects(newSort)
    }
    const updateFilters = (filters: FilterOptions) => {
        setFilters(filters)
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
            <Grid style={{ padding: '80px' }}>
                <Grid.Col span={1} style={{ backgroundColor: 'red' }}>
                    <FilterButton updateFilters={updateFilters} initialFilters={filters}/>
                </Grid.Col>
                <Grid.Col span={1} style={{ backgroundColor: 'blue' }}>
                    { filters.gender != '' ? <p>filter on gender {filters.gender}</p>: null }
                </Grid.Col>
                <Grid.Col span={8} style={{ backgroundColor: 'green' }}>
                    <p>asdf</p>
                </Grid.Col>
                <Grid.Col span={12}>
                    <SubjectTable subjects={filteredData} updateSort={handleSort}/>
                </Grid.Col>
            </Grid>
        </>
    )
}

export default View