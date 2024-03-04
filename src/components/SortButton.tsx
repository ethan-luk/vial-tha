import React, { useState } from 'react';
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import SubjectInfo from '../models/SubjectInfo';


  
interface SortButtonProps {
    updateSort: (sortedSubjects: SubjectInfo[]) => void;
    subjects: SubjectInfo[]
    sortBy: string
  }

const SortButton: React.FC<SortButtonProps> = ({ updateSort, subjects, sortBy }) => {

    const [sortAsc, setSortAsc] = useState<boolean>(true);
    
    const handleSort = () => {
        const sortedData = [...subjects];
        
        // Sort by name
        if (sortBy === 'Name') {
            sortedData.sort((a, b) => {
                if (sortAsc) {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
        }

        // Sort by diagnosis date
        else if (sortBy === 'Diagnosis Date') {
            sortedData.sort((a, b) => {
                if (sortAsc) {
                    return a.diagnosisDate.localeCompare(b.diagnosisDate);
                } else {
                    return b.diagnosisDate.localeCompare(a.diagnosisDate);
                }
            });
        }

        // Sort by age
        else if (sortBy === 'Age') {
            sortedData.sort((a, b) => {
                if (sortAsc) {
                  return a.age - b.age;
                } else {
                  return b.age - a.age;
                }
            });
        }
        
        updateSort(sortedData);
        setSortAsc(!sortAsc);
      };

    return (
        <>
            {
                sortAsc ? <SlArrowDown onClick={handleSort}
                                        style={{ paddingTop: '5px',
                                                float: 'right', 
                                                cursor: 'pointer',  // Add this line to change the cursor on hover
                                                transition: 'color 0.3s'}}/> : 
                          <SlArrowUp onClick={handleSort} 
                                        style={{ paddingTop: '5px', 
                                                float: 'right',
                                                cursor: 'pointer',
                                                transition: 'color 0.3s' }} />
            }
        </>
    );    
};

export default SortButton;