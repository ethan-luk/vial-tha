import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import View from './View';

export default function App() {
  return (
    <MantineProvider>
      <View />
    </MantineProvider>
  )
}