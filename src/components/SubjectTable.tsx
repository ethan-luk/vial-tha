import { Table } from '@mantine/core';
import '@mantine/dates/styles.css';
import SubjectInfo from '../models/SubjectInfo';
import SortButton from './SortButton';


interface DataProps {
    subjects: SubjectInfo[]
    updateSort: (sortedSubjects: SubjectInfo[]) => void;
}

const SubjectTable: React.FC<DataProps> = ({ subjects, updateSort }) => {

  const handleUpdateSort = (newData: SubjectInfo[]) => {
    updateSort(newData)
  }

  const headers = (
    <Table.Tr>
      <Table.Th>Name <SortButton updateSort={handleUpdateSort} subjects={subjects} sortBy='Name'/></Table.Th>
      <Table.Th>Age <SortButton updateSort={handleUpdateSort} subjects={subjects} sortBy='Age'/></Table.Th>
      <Table.Th>Gender</Table.Th>
      <Table.Th>Diagnosis Date <SortButton updateSort={handleUpdateSort} subjects={subjects} sortBy='Diagnosis Date'/></Table.Th>
      <Table.Th>Status</Table.Th>
    </Table.Tr>
  );

  const rows = subjects.map((subject) => (
    <Table.Tr key={subject.id}>
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