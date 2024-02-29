import { useEffect, useState } from 'react';
import Subject from './models/subject';
import { Table } from '@mantine/core';
import SortButton from './components/SortButton';


function SubjectTable() {

  const [subjects, setSubjects] = useState<Subject[]>([])

  // Fetch Data from Endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects');
        const result = (await response.json()).data as Subject[]

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

  const headers = (
    <Table.Tr>
      <Table.Th>Subject Id</Table.Th>
      <Table.Th>Name <SortButton updateSort={sortSubjects} subjects={subjects} sortBy={'name'} /></Table.Th>
      <Table.Th>Age <SortButton updateSort={sortSubjects} subjects={subjects} sortBy={'Age'} /></Table.Th>
      <Table.Th>Gender</Table.Th>
      <Table.Th>Diagnosis Date <SortButton updateSort={sortSubjects} subjects={subjects} sortBy={'Diagnosis Date'} /></Table.Th>
      <Table.Th>Status</Table.Th>
    </Table.Tr>
  );

  const rows = subjects.map((subject) => (
    <Table.Tr key={subject.id}>
      <Table.Td>{subject.id}</Table.Td>
      <Table.Td>{subject.name}</Table.Td>
      <Table.Td>{subject.age}</Table.Td>
      <Table.Td>{subject.gender}</Table.Td>
      <Table.Td>{subject.diagnosisDate}</Table.Td>
      <Table.Td>{subject.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>{headers}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default SubjectTable;