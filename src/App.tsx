import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import SubjectTable from './SubjectTable';
import Subject from './models/subject';

const initialSubjects: Subject[] = [
  { 
    id:"65c285f5-ef3b-5c9e-8f17-b15adb74d080",
    name:"Della Young",
    age:48,
    gender:"Female",
    diagnosisDate:"2102-12-18T10:59:09.731Z",
    status:"Inactive"
  },
  {
    id:"10bbbee3-6da9-5699-ad0d-367eea3a3c70",
    name:"Raymond Fox",
    age:50,
    gender:"Female",
    diagnosisDate:"2123-06-16T23:17:02.860Z",
    status:"Active"
  },
  {
    id:"ff065d2a-98c3-5c1a-96f5-37cfcf58bbb3",
    name:"Richard Carter",
    age:2,"gender":"Male",
    diagnosisDate:"2050-09-19T08:51:45.421Z",
    status:"Inactive"
  }
]

export default function App() {
  return (
    <MantineProvider>
      <SubjectTable subjects={initialSubjects}/>
    </MantineProvider>
  )
}