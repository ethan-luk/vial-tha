import React from 'react';
import Subject from './models/subject';
import { Table } from '@mantine/core';


interface ChildProps {
  subjects: Subject[];
}

  const SubjectTable: React.FC<ChildProps> = ({ subjects }) => {
    return (
      <>
        <Table>
          <Table.Tbody>
            {subjects.map((subject) => (
              <Table.Tr key={subject.id}>
                <Table.Td>{subject.id}</Table.Td>
                <Table.Td>{subject.name}</Table.Td>
                <Table.Td>{subject.age}</Table.Td>
                <Table.Td>{subject.gender}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </>
    );
  };

  export default SubjectTable;