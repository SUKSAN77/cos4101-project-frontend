"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

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

// ข้อมูลแสดงจำนวนครุภัณฑ์ตามเดือน
const chartData = [
  { 
    month: "ม.ค.",
    ปกติ: 5,
    ชำรุด: 1,
    จำหน่าย: 0,
  },
  { 
    month: "ก.พ.",
    ปกติ: 6,
    ชำรุด: 1,
    จำหน่าย: 0,
  },
  { 
    month: "มี.ค.",
    ปกติ: 6,
    ชำรุด: 2,
    จำหน่าย: 1,
  },
  { 
    month: "เม.ย.",
    ปกติ: 7,
    ชำรุด: 2,
    จำหน่าย: 1,
  },
  { 
    month: "พ.ค.",
    ปกติ: 7,
    ชำรุด: 2,
    จำหน่าย: 1,
  },
  { 
    month: "มิ.ย.",
    ปกติ: 7,
    ชำรุด: 2,
    จำหน่าย: 1,
  },
  { 
    month: "ก.ค.",
    ปกติ: 8,
    ชำรุด: 2,
    จำหน่าย: 1,
  },
  { 
    month: "ส.ค.",
    ปกติ: 8,
    ชำรุด: 2,
    จำหน่าย: 1,
  },
  { 
    month: "ก.ย.",
    ปกติ: 8,
    ชำรุด: 2,
    จำหน่าย: 1,
  },
  { 
    month: "ต.ค.",
    ปกติ: 7,
    ชำรุด: 2,
    จำหน่าย: 1,
  },
  { 
    month: "พ.ย.",
    ปกติ: 7,
    ชำรุด: 2,
    จำหน่าย: 1,
  },
  { 
    month: "ธ.ค.",
    ปกติ: 7,
    ชำรุด: 2,
    จำหน่าย: 1,
  },
];

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
