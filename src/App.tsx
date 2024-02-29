import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import SubjectTable from './SubjectTable';

export default function App() {
  return (
    <MantineProvider>
      <SubjectTable />
    </MantineProvider>
  )
}