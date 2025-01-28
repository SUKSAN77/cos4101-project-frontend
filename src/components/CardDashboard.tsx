import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import React from "react";

interface CardDashboardProps {
  title: string;
  total: number;
  percentage: string;
  icon: LucideIcon;
}

const CardDashboard: React.FC<CardDashboardProps> = ({
  title,
  total,
  percentage,
  icon: Icon,
}) => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">{percentage}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default CardDashboard;
