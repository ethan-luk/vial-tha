import { useState, useEffect } from "react";
import SubjectTable from "./components/SubjectTable"
import Subject from './models/SubjectInfo';
import FilterMap from "./components/FilterMap";
import { Button, Grid } from "@mantine/core";
import SubjectInfo from "./models/SubjectInfo";
import FilterOptions from "./models/FilterOptions";


const View = () => {

    const [subjects, setSubjects] = useState<Subject[]>([])
    const [filters, setFilters] = useState<FilterOptions>({
      gender: '',
      showActiveOnly: false,
      ageRange: [0, 120],
      startDate: new Date('0000-01-01T00:00:00.000Z'),
      endDate: new Date('9999-12-31T23:59:59.999Z')
    });

    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }[]>([]);
  
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

    useEffect(() => {
        const activeFiltersArray = [];

        if (filters.gender !== '') {
            activeFiltersArray.push({ 'Gender': filters.gender })
        }

        if (filters.ageRange[0] != 0) {
            activeFiltersArray.push({ 'Min Age': filters.ageRange[0].toString() })
        }

        if (filters.ageRange[1] != 120) {
            activeFiltersArray.push({ 'Max Age': filters.ageRange[1].toString() })
        }

        if (filters.startDate.getTime() != new Date('0000-01-01T00:00:00.000Z').getTime()) {
            activeFiltersArray.push({ 'Start Date': filters.startDate.toDateString() })
        }

        if (filters.endDate.getTime() != new Date('9999-12-31T23:59:59.999Z').getTime()) {
            activeFiltersArray.push({ 'End Date': filters.endDate.toDateString() })
        }
        
        setActiveFilters(activeFiltersArray);
    }, [filters])

    const handleSort = (newSort: SubjectInfo[]) => {
        setSubjects(newSort)
    }

    const updateFilters = (newFilters: FilterOptions) => {
        setFilters(newFilters)
    }

    const handleFilterRemoval = (element: { [key: string]: string }) => {
        const key = Object.keys(element)[0];
        console.log(key);
    
        const filterMappings: { [key: string]: () => void } = {
            'Gender': () => updateFilters({ ...filters, gender: '' }),
            'Min Age': () => updateFilters({ ...filters, ageRange: [0, filters.ageRange[1]] }),
            'Max Age': () => updateFilters({ ...filters, ageRange: [filters.ageRange[0], 120] }),
            'Start Date': () => updateFilters({ ...filters, startDate: new Date('0000-01-01T00:00:00.000Z') }),
            'End Date': () => updateFilters({ ...filters, startDate: new Date('9999-12-31T23:59:59.999Z') }),
        };
    
        if (filterMappings[key]) {
            filterMappings[key]();
        }
    };
      
    
    const filteredData = subjects.filter(item => {
        return (
            (filters.gender === '' || item.gender === filters.gender) &&
            (!filters.showActiveOnly || item.status === 'Active') &&
            (filters.ageRange[0] < item.age && filters.ageRange[1] > item.age) &&
            (filters.startDate < new Date(item.diagnosisDate)) && 
            (filters.endDate > new Date(item.diagnosisDate))
        );
    });

    const activeFilterElements = activeFilters.map((element, index) => (
        <Button key={index} onClick={() => handleFilterRemoval(element)}>
          {Object.entries(element).map(([key, value]) => (
            <p key={key}>{`${key}: ${value}`}</p>
          ))}
        </Button>
    ));

    return (
        <>
            <Grid style={{ padding: '80px' }} align-items='center'>
                <Grid.Col span={2} style={{ backgroundColor: 'red' }}>
                    <FilterMap updateFilters={updateFilters} initialFilters={filters}/>
                </Grid.Col>
                <Grid.Col span={10} style={{ backgroundColor: 'green' }}>
                    <p>asdf</p>
                </Grid.Col>
                <Grid.Col span={12} style={{ backgroundColor: 'green' }}>
                    {activeFilterElements}
                </Grid.Col>
                <Grid.Col span={12}>
                    <SubjectTable subjects={filteredData} updateSort={handleSort}/>
                </Grid.Col>
            </Grid>
        </>
    )
}

export default View