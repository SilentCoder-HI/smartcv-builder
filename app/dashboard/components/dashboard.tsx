import { EcommerceMetrics } from "@dashboard/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@dashboard/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@dashboard/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@dashboard/components/ecommerce/StatisticsChart";
import RecentOrders from "@dashboard/components/ecommerce/RecentOrders";
import DemographicCard from "@dashboard/components/ecommerce/DemographicCard";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
