import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

interface ProductionRun {
    id: string;
    timestamp: string;
    machine_id: string;
    temperature_c: number;
    yield_rate: number;
    defect_count: number;
}

const app = express();
app.use(cors());
const PORT = 3001;

const dataPath = path.join(__dirname, '../data/production_runs.json');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const productionRuns: ProductionRun[] = JSON.parse(rawData);

app.get('/api/dashboard-stats', (req: Request, res: Response) => {
    const machineStats: Record<string, { totalYield: number; count: number }> = {};

    productionRuns.forEach(run => {
        if (!machineStats[run.machine_id]) {
            machineStats[run.machine_id] = { totalYield: 0, count: 0 };
        }

        const stats = machineStats[run.machine_id];
        if (stats) {
            stats.totalYield += run.yield_rate;
            stats.count += 1;
        }
    });

    const chartData = Object.keys(machineStats).map(key => ({
        machine: key,
        avgYield: parseFloat((machineStats[key].totalYield / machineStats[key].count).toFixed(3)) * 100
    }));

    const scatterData = productionRuns.map(run => ({
        temp: run.temperature_c,
        yield: run.yield_rate * 100
    }));

    res.json({
        kpi: {
            totalRuns: productionRuns.length,
            globalAvgYield: (productionRuns.reduce((acc, curr) => acc + curr.yield_rate, 0) / productionRuns.length * 100).toFixed(1)
        },
        barChartData: chartData,
        scatterData: scatterData
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});