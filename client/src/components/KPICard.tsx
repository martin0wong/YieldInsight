import { Box, Stat, StatLabel, StatNumber, StatHelpText, useColorModeValue } from '@chakra-ui/react';

interface KPICardProps {
    title: string;
    value: string | number;
    color?: string;
    insight?: string;
    isAlert?: boolean;
}

export const KPICard = ({ title, value, color, insight, isAlert }: KPICardProps) => {
    const bg = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderColor={isAlert ? 'orange.400' : borderColor}
            borderLeftWidth={isAlert ? '4px' : '1px'}
            borderRadius="lg"
            bg={bg}
        >
            <Stat>
                <StatLabel fontSize="sm" color="gray.500" textTransform="uppercase" letterSpacing="wide">
                    {title}
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="bold" color={color || 'inherit'}>
                    {value}
                </StatNumber>
                {insight && (
                    <StatHelpText color={isAlert ? 'orange.500' : 'gray.400'} fontWeight={isAlert ? 'bold' : 'normal'}>
                        {insight}
                    </StatHelpText>
                )}
            </Stat>
        </Box>
    );
};