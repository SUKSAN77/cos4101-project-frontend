"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { mockEquipment } from "@/app/MockData";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// คำนวณข้อมูลรายเดือน
const calculateMonthlyData = () => {
  const monthlyData = new Array(12).fill(null).map((_, index) => ({
    month: new Date(2023, index).toLocaleString('th-TH', { month: 'short' }),
    ปกติ: 0,
    ชำรุด: 0,
    จำหน่าย: 0,
  }));

  mockEquipment.forEach(item => {
    const date = new Date(item.acquiredDate);
    const monthIndex = date.getMonth();
    const status = item.status;
    
    if (status === 0) monthlyData[monthIndex].ปกติ++;
    else if (status === 1) monthlyData[monthIndex].ชำรุด++;
    else if (status === 2) monthlyData[monthIndex].จำหน่าย++;
  });

  return monthlyData;
};

const chartConfig = {
  ปกติ: {
    label: "ปกติ",
    color: "#22c55e",
  },
  ชำรุด: {
    label: "ชำรุด",
    color: "#f59e0b",
  },
  จำหน่าย: {
    label: "จำหน่าย",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  const chartData = React.useMemo(() => calculateMonthlyData(), []);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>สถิติครุภัณฑ์รายเดือน</CardTitle>
        <CardDescription>แสดงจำนวนครุภัณฑ์แยกตามสถานะรายเดือน</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            height={300}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Legend />
            <ChartTooltip
              cursor={{ fill: 'rgba(200, 200, 200, 0.1)' }}
              content={<ChartTooltipContent />}
            />
            <Bar 
              dataKey="ปกติ" 
              fill="#22c55e" 
              radius={[4, 4, 0, 0]} 
              stackId="a"
            />
            <Bar 
              dataKey="ชำรุด" 
              fill="#f59e0b" 
              radius={[4, 4, 0, 0]} 
              stackId="a"
            />
            <Bar 
              dataKey="จำหน่าย" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]} 
              stackId="a"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          แสดงจำนวนครุภัณฑ์ทั้งหมดแยกตามสถานะในแต่ละเดือน ปี {new Date().getFullYear() + 543}
        </div>
      </CardFooter>
    </Card>
  );
}
