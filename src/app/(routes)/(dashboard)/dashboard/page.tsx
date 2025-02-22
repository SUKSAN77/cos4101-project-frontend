import React from "react";

import { BarChartComponent } from "@/components/chart-bar-multiple";
import { PieChartComponent } from "@/components/chart-pie-donut-text";
import Layout from "@/components/layout";
export default function page() {
    return (
        <Layout>
            <PieChartComponent />
            <BarChartComponent />
        </Layout>
    );
}
