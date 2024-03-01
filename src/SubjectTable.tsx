import { useEffect, useState } from 'react';
import Subject from './models/SubjectInfo';
import { Button, Table, Checkbox } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import SortButton from './components/SortButton';
import '@mantine/dates/styles.css';

function SubjectTable() {

  const [subjects, setSubjects] = useState<Subject[]>([])

  const [filters, setFilters] = useState({
    gender: '',
    showActiveOnly: false,
    startDate: new Date('0000-01-01T00:00:00.000Z'),
    endDate: new Date('9999-12-31T23:59:59.999Z')
  });

  // const [filteredData, setFilteredData] = useState<Subject[] | null>(null);
  const [checked, setChecked] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const sortSubjects = (newValue: Subject[]) => {
    console.log("pressed sort")
    setSubjects(newValue)
  };

  // const handleFilterByGender = (gender: String) => {
  //   if (filteredData && filteredData.length > 0) {
  //     // If filter is active, reset filter
  //     setFilteredData(null);
  //   } else {
  //     // If filter is inactive, apply filter
  //     const filteredByGender = subjects.filter(item => item.gender === gender);
  //     setFilteredData(filteredByGender);
  //   }
  // };

  // const handleActiveFilter = () => {
  //   if (checked) {
  //     setFilteredData(null);
  //   } else {
  //     const filteredByActive = subjects.filter(item => item.status === 'Active');
  //     setFilteredData(filteredByActive);
  //   }
  // }

  // const handleStartDateChange = (newStartDate: Date | null) => {

  //   const startDateToUse = newStartDate || new Date('0000-01-01T00:00:00.000Z');

  //   const filteredByStartDate = subjects.filter(item => new Date(item.diagnosisDate) > startDateToUse)
  //   setFilteredData(filteredByStartDate)

  //   setStartDate(newStartDate)
  // }
 
  // const handleEndDateChange = (newEndDate: Date | null) => {

  //   const endDateToUse = newEndDate || new Date('9999-12-31T23:59:59.999Z');

  //   const filteredByEndDate = subjects.filter(item => new Date(item.diagnosisDate) < endDateToUse);
  //   setFilteredData(filteredByEndDate);
  //   setEndDate(newEndDate);
  // };

  const handleFilterByGender = (gender: string) => {
    setFilters((prevFilters) => {
      const newGenderFilter = prevFilters.gender === gender ? '' : gender;

      return {
        ...prevFilters,
        gender: newGenderFilter,
      };
    });
  };

  const handleActiveFilter = () => {
    setFilters({
      ...filters,
      showActiveOnly: !filters.showActiveOnly,
    });
  };

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
    // Check if the item satisfies all the specified filters
    return (
      (filters.gender === '' || item.gender === filters.gender) &&
      (!filters.showActiveOnly || item.status === 'Active') &&
      (filters.startDate < new Date(item.diagnosisDate)) && 
      (filters.endDate > new Date(item.diagnosisDate))
    );
  });

  const headers = (
    <Table.Tr>
      <Table.Th>Subject Id</Table.Th>
      <Table.Th>Name <SortButton updateSort={sortSubjects} subjects={subjects} sortBy={'Name'} /></Table.Th>
      <Table.Th>Age <SortButton updateSort={sortSubjects} subjects={subjects} sortBy={'Age'} /></Table.Th>
      <Table.Th>Gender</Table.Th>
      <Table.Th>Diagnosis Date <SortButton updateSort={sortSubjects} subjects={subjects} sortBy={'Diagnosis Date'} /></Table.Th>
      <Table.Th>Status</Table.Th>
    </Table.Tr>
  );

  const rows = filteredData.map((subject) => (
    <Table.Tr key={subject.id}>
      <Table.Td>{subject.id}</Table.Td>
      <Table.Td>{subject.name}</Table.Td>
      <Table.Td>{subject.age}</Table.Td>
      <Table.Td>{subject.gender}</Table.Td>
      <Table.Td>{new Date(subject.diagnosisDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</Table.Td>
      <Table.Td>{subject.status}</Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Button onClick={() => handleFilterByGender('Female')}>
        Filter by Female
      </Button>

      <Button onClick={() => handleFilterByGender('Male')}>
        Filter by Male
      </Button>

      <Checkbox onClick={() => handleActiveFilter()} 
                label='Show Active Only' 
                checked={checked} 
                onChange={(event) => setChecked(event.currentTarget.checked)}/>

      <DatePickerInput label="Start Date"
                      placeholder="Start Date"
                      onChange={handleStartDateChange} />
      
      <DatePickerInput label="End Date"
                      placeholder="End Date"
                      onChange={handleEndDateChange} />

                    

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>{headers}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default SubjectTable;