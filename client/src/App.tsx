import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChakraProvider, Box, Container, SimpleGrid, Flex, Heading, Text, Button, useColorMode } from '@chakra-ui/react';
import { KPICard } from './components/KPICard';
import { YieldBarChart } from './components/YieldBarChart';
import { TempScatterChart } from './components/TempScatterChart';

interface DashboardData {
    kpi: { totalRuns: number; globalAvgYield: string };
    barChartData: { machine: string; avgYield: number }[];
    scatterData: { temp: number; yield: number }[];
}

function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        axios.get('http://localhost:3001/api/dashboard-stats')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!data) return <Box p={10}>Loading Analytics...</Box>;

    const yieldVal = Number(data.kpi.globalAvgYield);
    const yieldColor = yieldVal > 95 ? 'green.500' : 'red.500';

    return (
        <Container maxW="container.xl" py={10}>
            <Flex justify="space-between" align="center" mb={10} borderBottomWidth="1px" pb={5}>
                <Box>
                    <Heading size="lg" mb={1}>YieldInsight</Heading>
                    <Text color="gray.500">Manufacturing Quality Dashboard</Text>
                </Box>
                <Button onClick={toggleColorMode} size="sm" variant="outline">
                    {colorMode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </Button>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
                <KPICard
                    title="Global Yield Rate"
                    value={`${data.kpi.globalAvgYield}%`}
                    color={yieldColor}
                />
                <KPICard
                    title="Production Runs"
                    value={data.kpi.totalRuns}
                />
                <KPICard
                    title="Automated Insight"
                    value="Alert"
                    insight="High Temp Variance in Oven-1"
                    isAlert
                />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                <YieldBarChart data={data.barChartData} />
                <TempScatterChart data={data.scatterData} />
            </SimpleGrid>

        </Container>
    );
}

function App() {
    return (
        <ChakraProvider>
            <Dashboard />
        </ChakraProvider>
    );
}

export default App;