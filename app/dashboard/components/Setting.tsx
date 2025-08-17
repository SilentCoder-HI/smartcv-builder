"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import CountUp from "react-countup";
import {
  Trash2,
  ExternalLink,
  Loader2,
  User,
  PieChart as PieIcon,
  Link,
  Settings2,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import UserInfoCard from "./user-profile/UserInfoCard";
import UserMetaCard from "./user-profile/UserMetaCard";

type SectionType = "menu" | "account" | "usage" | "links" | "other";

type SettingsPageProps = {
  sub?: string;
  onNavigate?: (view: string, sub?: string) => void;
};

const usageTimeSeries = [
  { month: "Jan", cvs: 2, ai: 4, exports: 1, users: 12 },
  { month: "Feb", cvs: 4, ai: 6, exports: 2, users: 18 },
  { month: "Mar", cvs: 6, ai: 9, exports: 3, users: 28 },
  { month: "Apr", cvs: 8, ai: 11, exports: 4, users: 38 },
  { month: "May", cvs: 10, ai: 14, exports: 6, users: 45 },
  { month: "Jun", cvs: 12, ai: 16, exports: 7, users: 52 },
  { month: "Jul", cvs: 14, ai: 19, exports: 8, users: 58 },
  { month: "Aug", cvs: 18, ai: 23, exports: 10, users: 70 },
  { month: "Sep", cvs: 20, ai: 26, exports: 12, users: 76 },
  { month: "Oct", cvs: 22, ai: 28, exports: 13, users: 84 },
  { month: "Nov", cvs: 24, ai: 31, exports: 15, users: 92 },
  { month: "Dec", cvs: 28, ai: 36, exports: 18, users: 110 },
];

const breakdown = [
  { name: "CVs", value: 340 },
  { name: "AI uses", value: 420 },
  { name: "Exports", value: 160 },
];

const avatars = [
  { name: "Ali Khan" },
  { name: "Sara J" },
  { name: "Adeel" },
  { name: "Mariam" },
  { name: "Zaid" },
];

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

function useIsDarkMode() {
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      );
      const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", listener);
      return () =>
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .removeEventListener("change", listener);
    }
  }, []);
  return isDark;
}

export default function SettingsPagePro({ sub, onNavigate }: SettingsPageProps) {
  const isDark = useIsDarkMode();

  const [section, setSection] = useState<SectionType>(
    sub && ["menu", "account", "usage", "links", "other"].includes(sub)
      ? (sub as SectionType)
      : "menu"
  );
  const [loadingDelete, setLoadingDelete] = useState(false);

  // State for links form
  const [links, setLinks] = useState({
    linkedin: "",
    github: "",
    portfolio: "",
  });
  const [linksSaved, setLinksSaved] = useState(false);

  const totals = useMemo(() => {
    const totalCVs = usageTimeSeries.reduce(
      (s, r) => s + (typeof r.cvs === "number" ? r.cvs : 0),
      0
    );
    const totalAI = usageTimeSeries.reduce(
      (s, r) => s + (typeof r.ai === "number" ? r.ai : 0),
      0
    );
    const totalExports = usageTimeSeries.reduce(
      (s, r) => s + (typeof r.exports === "number" ? r.exports : 0),
      0
    );
    const currentUsers =
      usageTimeSeries.length > 0
        ? usageTimeSeries[usageTimeSeries.length - 1].users
        : 0;
    return { totalCVs, totalAI, totalExports, currentUsers };
  }, []);

  const handleDeleteAccount = () => {
    setLoadingDelete(true);
    setTimeout(() => {
      setLoadingDelete(false);
      alert("Account deleted (demo)");
      if (onNavigate) onNavigate("/settings", "menu");
      setSection("menu");
    }, 1400);
  };

  const handleLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLinks((prev) => ({
      ...prev,
      [id]: value,
    }));
    setLinksSaved(false);
  };

  const handleLinksSave = () => {
    setLinksSaved(true);
  };

  const handleLinksReset = () => {
    setLinks({
      linkedin: "",
      github: "",
      portfolio: "",
    });
    setLinksSaved(false);
  };

  const menuItems: {
    key: SectionType;
    label: string;
    icon: React.ReactNode;
    desc?: string;
  }[] = [
    {
      key: "account",
      label: "Account",
      icon: <User size={18} className="text-gray-800 dark:text-gray-100" />,
      desc: "Profile & security",
    },
    {
      key: "usage",
      label: "Usage",
      icon: <PieIcon size={18} className="text-blue-500" />,
      desc: "Plan & consumption",
    },
    {
      key: "links",
      label: "Links",
      icon: <Link size={18} className="text-green-500" />,
      desc: "Connect profiles",
    },
    {
      key: "other",
      label: "Other",
      icon: <Settings2 size={18} className="text-purple-500" />,
      desc: "Support & account actions",
    },
  ];

  // Render the main menu
  const renderMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl w-full"
    >
      <div className="rounded-2xl p-4 shadow-md mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <div className="mt-3 grid gap-3">
          {menuItems.map((it) => (
            <motion.button
              key={it.key}
              type="button"
              onClick={() => setSection(it.key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.995 }}
              className="w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                {it.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {it.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {it.desc}
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400" aria-hidden>
                →
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl p-4 shadow-md flex flex-col gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <Button
          variant="outline"
          className="w-full text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          onClick={() => onNavigate?.("/profile")}
          type="button"
        >
          Manage profile
        </Button>
        <Button
          variant="ghost"
          className="w-full flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          onClick={() => setSection("other")}
          type="button"
        >
          <ExternalLink size={16} className="text-purple-600 dark:text-purple-400" /> Contact support
        </Button>
      </div>
    </motion.div>
  );

  // Render a back button and section content
  const renderSection = (section: SectionType) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl w-full"
    >
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setSection("menu")}
          aria-label="Back to menu"
        >
          <ArrowLeft size={20} />
        </Button>
        <span className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-200">
          {menuItems.find((m) => m.key === section)?.label || "Settings"}
        </span>
      </div>
      {section === "account" && (
        <div className="rounded-2xl p-6 shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Account
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <UserMetaCard />
            <UserInfoCard />
          </div>
        </div>
      )}
      {section === "usage" && (
        <section className="rounded-2xl p-6 shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Usage & analytics
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Visual breakdown of consumption and adoption
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                type="button"
                className="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Export CSV
              </Button>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Upgrade plan
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Last 12 months
                  </div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Activity trend
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  CVs / AI / Exports
                </div>
              </div>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <AreaChart
                    data={usageTimeSeries}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorCV" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.22}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#f59e0b"
                          stopOpacity={0.18}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f59e0b"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#334155" : "#e5e7eb"}
                      strokeOpacity={isDark ? 0.08 : 0.12}
                    />
                    <XAxis
                      dataKey="month"
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                      tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                    />
                    <YAxis
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                      tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: isDark ? "#1f2937" : "#fff",
                        border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                        color: isDark ? "#f3f4f6" : "#111827",
                        fontSize: 13,
                      }}
                      labelStyle={{
                        color: isDark ? "#f3f4f6" : "#111827",
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        color: isDark ? "#9ca3af" : "#6b7280",
                        fontSize: 13,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="cvs"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorCV)"
                    />
                    <Area
                      type="monotone"
                      dataKey="ai"
                      stroke="#f59e0b"
                      fillOpacity={1}
                      fill="url(#colorAI)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-lg p-3 flex flex-col gap-3 relative bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Breakdown
                </div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Usage distribution
                </div>
              </div>
              <div
                style={{ width: "100%", height: 220 }}
                className="flex items-center justify-center relative"
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={breakdown}
                      innerRadius={56}
                      outerRadius={86}
                      dataKey="value"
                      paddingAngle={6}
                    >
                      {breakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {totals.totalCVs + totals.totalAI + totals.totalExports}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total actions
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {breakdown.map((b, idx) => (
                  <div
                    key={b.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        style={{
                          background: COLORS[idx],
                        }}
                        className="w-3 h-3 rounded-full inline-block"
                      />
                      <div className="text-gray-800 dark:text-gray-200">
                        {b.name}
                      </div>
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {b.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Active users
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                <CountUp end={totals.currentUsers} duration={1.2} />
              </div>
              <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                This is your monthly active users (MAU)
              </div>
            </div>
            <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Conversion
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {totals.totalAI > 0
                  ? `${Math.round(
                      (totals.totalExports / totals.totalAI) * 100
                    )}%`
                  : "0%"}
              </div>
              <Progress
                value={
                  totals.totalAI > 0
                    ? Math.min(
                        100,
                        (totals.totalExports / totals.totalAI) * 100
                      )
                    : 0
                }
                className="mt-2 bg-gray-200 dark:bg-gray-700 text-green-500"
              />
            </div>
            <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Recent signups
              </div>
              <div className="mt-3 flex -space-x-3 items-center">
                {avatars.map((a, i) => (
                  <div
                    key={a.name}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ring-2 ${
                      i === 0 ? "bg-blue-500" :
                      i === 1 ? "bg-pink-500" :
                      i === 2 ? "bg-green-500" :
                      i === 3 ? "bg-yellow-500" :
                      "bg-purple-500"
                    } shadow-sm ring-white dark:ring-gray-900`}
                    title={a.name}
                  >
                    {a.name.charAt(0)}
                  </div>
                ))}
                <div className="text-sm ml-3 text-gray-500 dark:text-gray-400">
                  +{Math.max(0, totals.currentUsers - avatars.length)} new this month
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {section === "links" && (
        <div className="rounded-2xl p-6 shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Links
          </h3>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLinksSave();
            }}
            autoComplete="off"
          >
            <div>
              <Label htmlFor="linkedin" className="text-gray-700 dark:text-gray-300">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={links.linkedin}
                onChange={handleLinksChange}
                autoComplete="off"
                className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="github" className="text-gray-700 dark:text-gray-300">
                GitHub
              </Label>
              <Input
                id="github"
                placeholder="https://github.com/username"
                value={links.github}
                onChange={handleLinksChange}
                autoComplete="off"
                className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="portfolio" className="text-gray-700 dark:text-gray-300">
                Portfolio
              </Label>
              <Input
                id="portfolio"
                placeholder="https://yourportfolio.com"
                value={links.portfolio}
                onChange={handleLinksChange}
                autoComplete="off"
                className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="md:col-span-2 flex gap-3 mt-4">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleLinksReset}
                className="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Reset
              </Button>
              {linksSaved && (
                <span className="text-sm ml-2 self-center text-green-600 dark:text-green-400">
                  Saved!
                </span>
              )}
            </div>
          </form>
        </div>
      )}
      {section === "other" && (
        <div className="rounded-2xl p-6 shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Other
          </h3>
          <div className="flex flex-col gap-3">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open("mailto:support@example.com", "_blank");
                }
              }}
            >
              <ExternalLink size={16} className="text-purple-600 dark:text-purple-400" /> Contact Support
            </Button>
            <Button
              variant="destructive"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteAccount}
              disabled={loadingDelete}
              type="button"
            >
              {loadingDelete ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <Trash2 size={16} />
              )}
              Delete Account
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="mx-auto p-6 min-h-screen max-w-7xl flex flex-col items-center text-gray-800 dark:text-gray-200 transition-colors duration-200">
      {section === "menu" ? renderMenu() : renderSection(section)}
    </div>
  );
}