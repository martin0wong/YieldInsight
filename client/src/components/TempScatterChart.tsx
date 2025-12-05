import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <Box p={3} bg="gray.800" color="white" borderRadius="md" shadow="lg">
                {payload.map((entry: any, index: number) => (
                    <Box key={index} fontSize="sm">
                        {entry.name}: {Number(entry.value).toFixed(1)}
                        {entry.name === 'Temp' ? '°' : '%'}
                    </Box>
                ))}
            </Box>
        );
    }
    return null;
};

export const TempScatterChart = ({ data }: { data: any[] }) => {
    const bg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('#4A5568', '#A0AEC0');
    const gridColor = useColorModeValue('#E2E8F0', '#4A5568');
    const dotColor = useColorModeValue('#e53e3e', '#fc8181');

    return (
        <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg" bg={bg} height="500px">
            <Heading size="sm" mb={4} color="gray.500" textTransform="uppercase">
                Temp vs Yield Correlation
            </Heading>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, left: 0, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis
                        type="number"
                        dataKey="temp"
                        name="Temp"
                        domain={['auto', 'auto']}
                        tick={{ fill: textColor, fontSize: 12 }}
                        tickFormatter={(val) => `${val.toFixed(0)}°`}
                    >
                        <Label
                            value="Temperature (°C)"
                            offset={0}
                            position="bottom"
                            style={{fill: textColor, fontSize: 12, fontWeight: 'bold'}}
                        />
                    </XAxis>
                    <YAxis
                        type="number"
                        dataKey="yield"
                        name="Yield"
                        domain={['auto', 'auto']}
                        tick={{ fill: textColor, fontSize: 12 }}
                        tickFormatter={(val) => `${val.toFixed(0)}%`}
                    />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                    <Scatter name="Run Data" data={data} fill={dotColor} fillOpacity={0.6} r={4} />
                </ScatterChart>
            </ResponsiveContainer>
        </Box>
    );
};