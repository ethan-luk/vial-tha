import { useState, useEffect } from "react";
import SubjectTable from "./components/SubjectTable"
import Subject from './models/SubjectInfo';
import FilterMap from "./components/FilterMap";
import { Center, Checkbox, Chip, Flex, Grid, Group, SegmentedControl, Stack, TextInput, Title, rem, Text } from "@mantine/core";
import SubjectInfo from "./models/SubjectInfo";
import { FilterOptions } from "./models/FilterOptions";
import ActiveFilterElements from "./components/ActiveFilterElements";
import { IoGridOutline } from "react-icons/io5";
import { CiViewTable } from "react-icons/ci";
import SubjectGrid from "./components/SubjectGrid";
import { IconX } from "@tabler/icons-react";
import GridSortMap from "./components/GridSortMap";
import { GiSadCrab } from "react-icons/gi";

const View = () => {

    const [subjects, setSubjects] = useState<Subject[]>([])
    const [initialSubjects, setInitialSubjects] = useState<Subject[]>([])
    const [filters, setFilters] = useState<FilterOptions>({
      gender: '',
      showActiveOnly: false,
      ageRange: [0, 120],
      startDate: new Date('0000-01-01T00:00:00.000Z'),
      endDate: new Date('9999-12-31T23:59:59.999Z'),
      searchText: ''
    });

    const [loadingData, setLoadingData] = useState<boolean>(false)
    const [viewControl, setViewControl] = useState<string>('grid')


    const [isActiveFilterChecked, setIsActiveFilterChecked] = useState<boolean>(false);    


    const [activeFilters, setActiveFilters] = useState<{[key: string]: string}[]>([])
    const [activeSort, setActiveSort] = useState<{[key: string]: string}>({})

    // Fetch Data from Endpoint
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true)
                const response = await fetch('https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects');
                const result = (await response.json()).data as Subject[]
        
                console.log(result)
                setSubjects(result)
                setInitialSubjects(result)
                setLoadingData(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleSort = (newSort: SubjectInfo[], activeSort: { [key: string]: string }) => {
        setSubjects(newSort)
        setActiveSort(activeSort)
    }

    const updateFilters = (newFilters: FilterOptions) => {
        setFilters(newFilters)
    } 

    const updateActiveFilters = (newActiveFilters: {[key: string]: string}[]) => {
        setActiveFilters(newActiveFilters)
    }

    const handleIsActiveFilter = () => {
        setFilters({
          ...filters,
          showActiveOnly: !filters.showActiveOnly,
        });
    };

    const handleSearchFilter = (searchText: string) => {
        setFilters({
            ...filters,
            searchText: searchText
        });
    }

    const handleRemoveSort = () => {
        setSubjects(initialSubjects)
        setActiveSort({})
    }
    
    const filteredData = subjects.filter(item => {
        return (
            (filters.gender === '' || item.gender === filters.gender) &&
            (!filters.showActiveOnly || item.status === 'Active') &&
            (filters.ageRange[0] < item.age && filters.ageRange[1] > item.age) &&
            (filters.startDate < new Date(item.diagnosisDate)) && 
            (filters.endDate > new Date(item.diagnosisDate)) &&
            (item.name.toLowerCase().startsWith(filters.searchText.toLowerCase()))
        );
    });

    return (
        <>
        <Grid ps='80px' pe='80px'>
                <Grid.Col span={12} />
                <Grid.Col span={12} />
                <Grid.Col span={12} />
                <Grid.Col span={5}>
                    <Title c='orange' order={2}>Subjects</Title>
                </Grid.Col>
                <Grid.Col span={7}>
                    <Flex
                        mih={45}
                        justify="flex-end"
                        align="flex-end"
                        direction="row"
                        wrap="wrap"
                        >
                        <SegmentedControl
                            fullWidth
                            radius='md'
                            value={viewControl}
                            onChange={setViewControl}
                            color='orange'
                            data={[
                                { label: (
                                    <Center style={{ gap: 10 }}>
                                      <IoGridOutline style={{ width: rem(16), height: rem(16) }} />
                                      <span>Grid View</span>
                                    </Center>
                                  ), value: 'grid' },
                                { label: (
                                    <Center style={{ gap: 10 }}>
                                      <CiViewTable style={{ width: rem(16), height: rem(16) }} />
                                      <span>Table View</span>
                                    </Center>
                                  ), value: 'table' },
                            ]}
                        />
                    </Flex>
                </Grid.Col>
                <Grid.Col span={9}>
                    <Group gap='lg'>
                        <TextInput
                            size='md'
                            w='350px'
                            placeholder="Search Subjects"
                            onChange={(event) => handleSearchFilter(event.target.value)}
                        />
                        <FilterMap updateFilters={updateFilters} currentFilters={filters} activeFilters={activeFilters} />
                        <GridSortMap updateSort={handleSort} activeSort={Object.keys(activeSort).length > 0} subjects={filteredData}/>
                    </Group>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Flex
                        mih={30}
                        justify="flex-end"
                        align="flex-end"
                        direction="row"
                        wrap="wrap"
                        >
                        <Checkbox onClick={() => handleIsActiveFilter()} 
                                    label='Show Active Only'
                                    variant='outline'
                                    color='orange'
                                    checked={isActiveFilterChecked} 
                                    onChange={(event) => setIsActiveFilterChecked(event.currentTarget.checked)}/>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Group gap='sm'>
                        <ActiveFilterElements updateFilters={updateFilters} 
                                            updateActiveFilters={updateActiveFilters} 
                                            currentFilters={filters}/>
                         <Chip
                                icon={<IconX style={{ width: rem(16), height: rem(16) }} />}
                                color="green"
                                variant="light"
                                opacity={Object.entries(activeSort).length > 0 ? 1 : 0}
                                checked={true}
                                onClick={handleRemoveSort}
                                >
                            {Object.entries(activeSort).map(([key, value]) => (
                                <p key={key}>{`${key}: ${value}`}</p>
                            ))}
                            </Chip>
                    </Group>
                </Grid.Col>
                <Grid.Col span={12}>
                    {viewControl == 'grid' ? <SubjectGrid subjects={filteredData} /> : <SubjectTable subjects={filteredData} updateSort={handleSort}/>}
                </Grid.Col>
                <Grid.Col span={12}>
                    {filteredData.length == 0 && !loadingData &&
                        <Stack gap='xl'>
                            <Flex
                                mih={50}
                                mt={50}
                                justify="center"
                                align="flex-start"
                                >
                                <GiSadCrab color='orange' style={{ width: rem(200), height: rem(200) }}/>

                            </Flex>
                            <Text size='xl' ta='center' fw={700}>Whoops! Looks like nobody matches the filters you were looking for!</Text>
                        </Stack>
                    }
                </Grid.Col>
            </Grid>

        </>
    )
}

export default View