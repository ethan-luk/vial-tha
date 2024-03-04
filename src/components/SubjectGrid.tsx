import SubjectInfo from "../models/SubjectInfo";
import { Container, Flex, Grid, Space, Stack, rem, Text } from "@mantine/core";
import { FaFemale, FaMale } from "react-icons/fa";

interface GridProps {
  subjects: SubjectInfo[];
}

const SubjectGrid: React.FC<GridProps> = ({ subjects }) => {
  const demoProps = (gender: string) => {
    return {
      bg:
        gender === "Female"
          ? "var(--mantine-color-grape-light)"
          : "var(--mantine-color-blue-light)",
      h: 275,
      style: {
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
    };
  };

  const elements = subjects.map((subject) => (
    <Grid.Col key={subject.id} span={2.4}>
      <Container {...demoProps(subject.gender)}>
        <Stack justify="center" gap="xs">
          <Flex mih={50} mt={50} justify="center" align="flex-start">
            {subject.gender == "Female" ? (
              <FaFemale
                style={{ width: rem(60), height: rem(60), color: "#DE3163" }}
              />
            ) : (
              <FaMale
                style={{ width: rem(60), height: rem(60), color: "#0096FF" }}
              />
            )}
          </Flex>
          <Space h="lg" />
          <Text size="lg" ta="center" fw={700}>
            {subject.name}, {subject.gender == "Female" ? "F" : "M"}
          </Text>
          <Text size="xl" ta="center">
            {subject.age.toString()}
          </Text>
          <Text size="xs" ta="center">
            Diagnosis Date: <br />
            {new Date(subject.diagnosisDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            , {subject.status}
          </Text>
        </Stack>
      </Container>
    </Grid.Col>
  ));

  return (
    <>
      <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>{elements}</Grid>
    </>
  );
};

export default SubjectGrid;
