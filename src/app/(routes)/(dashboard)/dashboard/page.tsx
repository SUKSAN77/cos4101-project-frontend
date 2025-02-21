import React from "react";
import Layout from "@/components/layout";
import { PieChartComponent } from "@/components/chart-pie-donut-text";
import { BarChartComponent } from "@/components/chart-bar-multiple";
export default function page() {
  return (
    <Layout>
      <PieChartComponent />
      <BarChartComponent />
    </Layout>
  );
}
