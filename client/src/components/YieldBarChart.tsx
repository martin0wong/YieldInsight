import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

// Reusable Tooltip Logic
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Box p={3} bg="gray.800" color="white" borderRadius="md" shadow="lg">
                <Box fontWeight="bold">{label}</Box>
                {payload.map((entry: any, index: number) => (
                    <Box key={index} fontSize="sm">
                        {entry.name}: {Number(entry.value).toFixed(1)}%
                    </Box>
                ))}
            </Box>
        );
    }
    return null;
};

export const YieldBarChart = ({ data }: { data: any[] }) => {
    // Theme Hooks
    const bg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('#4A5568', '#A0AEC0'); // Gray.600 vs Gray.400
    const gridColor = useColorModeValue('#E2E8F0', '#4A5568'); // Gray.200 vs Gray.600
    const barColor = useColorModeValue('#3182ce', '#63b3ed');   // Blue.500 vs Blue.300

    return (
        <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg" bg={bg} height="500px">
            <Heading size="sm" mb={4} color="gray.500" textTransform="uppercase">
                Average Yield by Machine
            </Heading>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                    <XAxis
                        dataKey="machine"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: textColor, fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        domain={['dataMin - 2', 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: textColor, fontSize: 12 }}
                        tickFormatter={(val) => `${val.toFixed(0)}%`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="avgYield" fill={barColor} radius={[4, 4, 0, 0]} name="Yield" barSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};