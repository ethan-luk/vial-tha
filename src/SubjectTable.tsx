import { useEffect, useState } from 'react';
import Subject from './models/subject';
import { Table } from '@mantine/core';

function SubjectTable() {

  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        const response = await fetch('https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects');
        const result = (await response.json()).data as Subject[]

        setSubjects(result);
        setIsLoadingData(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(subjects)
  }, [subjects])

  const ths = (
    <Table.Tr>
      <Table.Th>Subject Id</Table.Th>
      <Table.Th>Name</Table.Th>
      <Table.Th>Age</Table.Th>
      <Table.Th>Gender</Table.Th>
      <Table.Th>Diagnosis Data</Table.Th>
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
  ))

  return (
    <>
      {
        isLoadingData ? 
          <p>Loading...</p> : 
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
      }
    </>
  );
};

export default SubjectTable;