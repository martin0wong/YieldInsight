const fs = require('fs');
const path = require('path');

const NUM_RECORDS = 500;
const MACHINES = ['Press-A', 'Press-B', 'Oven-1', 'Oven-2', 'Mixer-X'];

const data = [];

for (let i = 0; i < NUM_RECORDS; i++) {
    const machine = MACHINES[Math.floor(Math.random() * MACHINES.length)];

    // assuming higher temp, lower yield
    let baseTemp = machine.includes('Oven') ? 220 : 150;
    let temp = baseTemp + (Math.random() * 50 - 25);
    let yieldPenalty = (temp - 130) * 0.002;
    if (yieldPenalty < 0) yieldPenalty = 0;

    // noise
    let yieldRate = 0.98 - yieldPenalty + (Math.random() * 0.05 - 0.025);
    yieldRate = Math.max(0.7, Math.min(1.0, yieldRate));

    data.push({
        id: `RUN-${1000 + i}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        machine_id: machine,
        temperature_c: parseFloat(temp.toFixed(1)),
        yield_rate: parseFloat(yieldRate.toFixed(3)),
        defect_count: Math.floor((1 - yieldRate) * 1000)
    });
}

const dir = path.join(__dirname, '../server/data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'production_runs.json'), JSON.stringify(data, null, 2));
console.log(`Generated ${NUM_RECORDS} records in server/data/production_runs.json`);