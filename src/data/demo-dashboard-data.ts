// Demo data for dashboard components

export interface StatCard {
  title: string
  value: string | number
  change: number
  changeType: "increase" | "decrease"
  description?: string
  icon?: string
}

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

export const dashboardStats: StatCard[] = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: 20.1,
    changeType: "increase",
    description: "From last month",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: 12.5,
    changeType: "increase",
    description: "From last week",
  },
  {
    title: "Orders",
    value: "1,234",
    change: 5.2,
    changeType: "increase",
    description: "From yesterday",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: 2.1,
    changeType: "decrease",
    description: "From last month",
  },
]

export const monthlyRevenueData: ChartDataPoint[] = [
  { month: "Jan", revenue: 4200, target: 5000 },
  { month: "Feb", revenue: 5200, target: 5000 },
  { month: "Mar", revenue: 4800, target: 5000 },
  { month: "Apr", revenue: 6100, target: 5000 },
  { month: "May", revenue: 5500, target: 5000 },
  { month: "Jun", revenue: 6800, target: 5000 },
  { month: "Jul", revenue: 7200, target: 5000 },
  { month: "Aug", revenue: 6500, target: 5000 },
  { month: "Sep", revenue: 5800, target: 5000 },
  { month: "Oct", revenue: 6900, target: 5000 },
  { month: "Nov", revenue: 7500, target: 5000 },
  { month: "Dec", revenue: 8200, target: 5000 },
]

export const userGrowthData: ChartDataPoint[] = [
  { month: "Jan", users: 1200, newUsers: 200 },
  { month: "Feb", users: 1450, newUsers: 250 },
  { month: "Mar", users: 1680, newUsers: 230 },
  { month: "Apr", users: 1920, newUsers: 240 },
  { month: "May", users: 2150, newUsers: 230 },
  { month: "Jun", users: 2350, newUsers: 200 },
]

export const categoryDistribution: ChartDataPoint[] = [
  { name: "Electronics", value: 35, color: "var(--chart-1)" },
  { name: "Clothing", value: 28, color: "var(--chart-2)" },
  { name: "Food", value: 20, color: "var(--chart-3)" },
  { name: "Books", value: 12, color: "var(--chart-4)" },
  { name: "Other", value: 5, color: "var(--chart-5)" },
]

export const recentActivities = [
  {
    id: "1",
    type: "order",
    message: "New order #1234 received",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: "2",
    type: "user",
    message: "New user registered: john.doe@example.com",
    time: "15 minutes ago",
    status: "info",
  },
  {
    id: "3",
    type: "payment",
    message: "Payment processed: $1,234.56",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: "4",
    type: "alert",
    message: "Low stock alert: Product XYZ",
    time: "2 hours ago",
    status: "warning",
  },
  {
    id: "5",
    type: "system",
    message: "System backup completed",
    time: "3 hours ago",
    status: "info",
  },
]

export const topProducts = [
  { id: "1", name: "Product A", sales: 1234, revenue: "$12,340" },
  { id: "2", name: "Product B", sales: 987, revenue: "$9,870" },
  { id: "3", name: "Product C", sales: 756, revenue: "$7,560" },
  { id: "4", name: "Product D", sales: 654, revenue: "$6,540" },
  { id: "5", name: "Product E", sales: 543, revenue: "$5,430" },
]

