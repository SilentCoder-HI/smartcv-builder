"use client";
import React from "react";
import Badge from "./ui/badge/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Briefcase,
  User,
  FileText
} from "lucide-react"

// All metrics data in a single array of objects
const metricsData = [
  {
    label: "Total CVs",
    value: "3",
    icon: FileText,
    trend: "up",
    change: "+1 from last month",
    badgeColor: "success",
    iconClass: "h-4 w-4 text-gray-700 dark:text-gray-200",
  },
  {
    label: "Avg Match Score",
    value: "88%",
    icon: Sparkles,
    trend: "up",
    change: "+5% from last week",
    badgeColor: "success",
    iconClass: "h-4 w-4 text-gray-700 dark:text-gray-200",
  },
  {
    label: "Applications",
    value: "12",
    icon: Briefcase,
    trend: "up",
    change: "+3 this week",
    badgeColor: "success",
    iconClass: "h-4 w-4 text-gray-700 dark:text-gray-200",
  },
];

export const Overview = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 mb-8">
      {metricsData.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <Card
            key={metric.label}
            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {metric.label}
              </CardTitle>
              <Icon className={metric.iconClass} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metric.value}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{metric.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
