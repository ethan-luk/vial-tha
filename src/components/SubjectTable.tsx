import { useEffect, useState } from "react";
import SubjectInfo from "../models/SubjectInfo";
import TableSortButton from "./TableSortButton";
import { Table, Pagination, Flex, Space } from "@mantine/core";
import "@mantine/dates/styles.css";

interface TableProps {
  updateSort: (
    sortedSubjects: SubjectInfo[],
    activeSort: { [key: string]: string }
  ) => void;
  subjects: SubjectInfo[];
}

const SubjectTable: React.FC<TableProps> = ({ updateSort, subjects }) => {
  const [activePage, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [subjects]);

  const handleUpdateSort = (
    newData: SubjectInfo[],
    activeSort: { [key: string]: string }
  ) => {
    updateSort(newData, activeSort);
  };

  const itemsPerPage = 10;
  const numPages = Math.ceil(subjects.length / 10);

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = subjects.slice(startIndex, endIndex);

  const headers = (
    <Table.Tr>
      <Table.Th c="orange">
        Name{" "}
        <TableSortButton
          updateSort={handleUpdateSort}
          subjects={subjects}
          sortBy="Name"
        />
      </Table.Th>
      <Table.Th c="orange">
        Age{" "}
        <TableSortButton
          updateSort={handleUpdateSort}
          subjects={subjects}
          sortBy="Age"
        />
      </Table.Th>
      <Table.Th c="orange">Gender</Table.Th>
      <Table.Th c="orange">
        Diagnosis Date{" "}
        <TableSortButton
          updateSort={handleUpdateSort}
          subjects={subjects}
          sortBy="Diagnosis Date"
        />
      </Table.Th>
      <Table.Th c="orange">Status</Table.Th>
    </Table.Tr>
  );

  const rows = visibleData.map((subject) => (
    <Table.Tr key={subject.id}>
      <Table.Td>{subject.name}</Table.Td>
      <Table.Td>{subject.age}</Table.Td>
      <Table.Td>{subject.gender}</Table.Td>
      <Table.Td>
        {new Date(subject.diagnosisDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </Table.Td>
      <Table.Td>{subject.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table stickyHeader verticalSpacing="lg">
        <Table.Thead>{headers}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Space h="sm" />
      <Flex justify="center">
        <Pagination
          color="orange"
          total={numPages}
          value={activePage}
          onChange={setPage}
          mt="sm"
        />
      </Flex>
    </>
  );
};

export default SubjectTable;
