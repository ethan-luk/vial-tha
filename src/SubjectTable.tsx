import { Table } from '@mantine/core';
import '@mantine/dates/styles.css';
import SubjectInfo from './models/SubjectInfo';

interface DataProps {
    subjectData: SubjectInfo[]
}
const SubjectTable: React.FC<DataProps> = ({ subjectData }) => {

  const headers = (
    <Table.Tr>
      <Table.Th>Subject Id</Table.Th>
      <Table.Th>Name</Table.Th>
      <Table.Th>Age</Table.Th>
      <Table.Th>Gender</Table.Th>
      <Table.Th>Diagnosis Date</Table.Th>
      <Table.Th>Status</Table.Th>
    </Table.Tr>
  );

  const rows = subjectData.map((subject) => (
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
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>{headers}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default SubjectTable;