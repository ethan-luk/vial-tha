import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import View from './View';


export default function App() {
  return (
    <MantineProvider>
      <View />
    </MantineProvider>
  )
}