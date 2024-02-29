import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import SubjectTable from './SubjectTable';
import Subject from './models/subject';
import { useEffect, useState } from 'react';


export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)

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

  useEffect(() => {
    setIsLoadingData(false)
    console.log(subjects)
  }, [subjects])

  return (
    <MantineProvider>
      {
        !isLoadingData && <SubjectTable subjects={subjects}/>
      }
    </MantineProvider>
  )
}