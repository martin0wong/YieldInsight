# YieldInsight: Manufacturing Analytics Dashboard

## Acknowledgement
Gemini was used to generate a lot of the work required before actually starting to code up the visualization portion and backend filtering portion to simulate fetching data from a data lake/data warehouse.

### 🚧 Project Context
**This project was architected and built as a rapid engineering sprint to serve as a frontend demonstration.**

Due to **Academic Integrity policies** and **Non-Disclosure Agreements (NDAs)** covering my internship work, the source code for my primary data visualization projects cannot be made public.

**YieldInsight** was created to bridge that gap. It is a "cleanroom" implementation that combines the **technical architecture** of my academic work with the **domain knowledge** obtained during my industry experience, using entirely synthetic data.

---

### 📋 Overview
YieldInsight is a full-stack data visualization application designed to help manufacturing engineers identify production bottlenecks. It mimics a real-world scenario where high-volume telemetry data (Temperature, Pressure) must be aggregated to analyze Production Yield Rates.

### 🛠 Tech Stack
This project demonstrates a strongly typed, full-stack approach to Data Visualization Engineering.

*   **Frontend:** React, TypeScript
*   **Visualization:** Recharts
*   **Backend:** Node.js, Express, TypeScript
*   **Data Processing:** Server-side aggregation and filtering

### 🚀 Key Features
*   **Full-Stack Architecture:** Decoupled Client-Server model. The backend processes raw logs and serves aggregated statistics, keeping the frontend performant.
*   **Interactive Visualizations:**
    *   **Bar Charts:** Visualize yield performance across different machine units.
    *   **Scatter Plots:** Correlate telemetry data (Temperature) with output quality to identify root causes of defects.
*   **UI/UX Design:** Fully responsive layout with automatic **Dark Mode** support using Chakra UI.
*   **Type Safety:** Strict TypeScript interfaces shared between data processing logic and visualization components.

### 🏗 Architecture & Design Decisions
To emulate the complexity of my previous work within a constrained timeline, I focused on three engineering principles:

1.  **Data-Ink Ratio:** Charts are designed to minimize clutter. Axis domains scale dynamically based on the dataset to highlight variance rather than absolute zero.
2.  **Modular Components:** Visualization logic is encapsulated in reusable components (`YieldBarChart`, `TempScatterChart`) to separate data fetching from rendering logic.
3.  **Synthetic Data Generation:** Includes a custom script (`scripts/generateData.js`) that algorithmically generates production runs with realistic noise and correlation trends (e.g., *Higher Temp = Lower Yield*).

### 💻 Local Setup
This project is structured as a monorepo.

**1. Clone the repository**
```bash
    git clone https://github.com/yourusername/yield-insight.git
    cd yield-insight
```

**2. Start the Backend API**\
The backend serves the data and handles aggregation.
```bash
    cd server
    npm install
    # Generate fresh synthetic data
    node ../scripts/generateData.js
    # Start the server (Runs on Port 3001)
    npx ts-node src/index.ts
```

**3. Start the Frontend Dashboard** \
Open a new terminal window.
```Bash
    cd client
    npm install
    # Start Vite (Runs on Port 5173)
    npm run dev
```
