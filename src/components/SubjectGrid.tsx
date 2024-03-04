import { Container, Flex, Grid, Space, Stack, rem, Text } from "@mantine/core"
import SubjectInfo from "../models/SubjectInfo"
import { FaFemale, FaMale } from "react-icons/fa";


interface GridProps {
    subjects: SubjectInfo[]
}


const SubjectGrid: React.FC<GridProps> = ({ subjects }) => {

    const demoProps = (gender: string) => {
        return {
            bg: gender === 'Female' ? 'var(--mantine-color-pink-light)' : 'var(--mantine-color-blue-light)',
            h: 275,
            style: {
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Add the shadow style here
            }
        };
    };

    const elements = subjects.map(subject => (
        <Grid.Col key={subject.id} span={2.4}>
            <Container {...demoProps(subject.gender)}>
                <Stack justify="center" gap='xs'>
                    <Flex
                        mih={50}
                        mt={50}
                        justify="center"
                        align="flex-start"
                        >
                        {subject.gender == 'Female' ? <FaFemale style={{ width: rem(60), 
                                                                height: rem(60), 
                                                                color: 'orange'}} /> : 
                                                    <FaMale style={{ width: rem(60), 
                                                                    height: rem(60), 
                                                                    color: 'orange' }}/>}
                    </Flex>
                    <Space h="lg" />
                    <Text size='lg' ta='center' fw={700}>{subject.name}</Text>
                    <Text size='xl' ta='center'>{subject.age.toString()}</Text>
                    <Text size='xs' ta='center'>{subject.status}</Text>
                </Stack>
            </Container>
        </Grid.Col>
    ));


    return (
        <>
            <Grid  gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                {elements}
            </Grid>

        </>
    )
}

export default SubjectGrid