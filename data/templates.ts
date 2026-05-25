import { Template } from "@/types/app"

export const templates: Template[] = [
  {
    id: "crm",
    name: "CRM Workspace",
    description: "Customer management with pipeline analytics",
    category: "Sales",
    complexity: "Advanced",
    version: 2,
    keywords: ["crm", "customer", "sales", "lead", "contact", "pipeline"],
    schema: {
      layout: "crm",
      components: [
        { id: "revenue-stat", type: "stats", title: "Revenue", metric: "Revenue", value: "$48k", change: "+18.2%" },
        { id: "customers-stat", type: "stats", title: "Customers", metric: "Customers", value: "1,284", change: "+6.4%" },
        { id: "pipeline-stat", type: "stats", title: "Pipeline", metric: "Pipeline", value: "$312k", change: "+12.1%" },
        { id: "revenue-chart", type: "chart", title: "Revenue Analytics" },
        { id: "customers-table", type: "table", title: "Customers", fields: ["name", "email", "status", "notes"] }
      ]
    }
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "KPI dashboards and growth charts",
    category: "Analytics",
    complexity: "Moderate",
    version: 1,
    keywords: ["analytics", "chart", "dashboard", "metrics", "kpi", "report"],
    schema: {
      layout: "analytics",
      components: [
        { id: "mrr-stat", type: "stats", title: "MRR", metric: "MRR", value: "$92k", change: "+9.8%" },
        { id: "conversion-stat", type: "stats", title: "Conversion", metric: "Conversion", value: "4.2%", change: "+1.1%" },
        { id: "retention-stat", type: "stats", title: "Retention", metric: "Retention", value: "88%", change: "+2.4%" },
        { id: "growth-chart", type: "chart", title: "Growth Overview" }
      ]
    }
  },
  {
    id: "hr",
    name: "HR Dashboard",
    description: "People operations and hiring workspace",
    category: "People",
    complexity: "Advanced",
    version: 1,
    keywords: ["hr", "hiring", "employee", "people", "payroll", "team"],
    schema: {
      layout: "hr",
      components: [
        { id: "headcount-stat", type: "stats", title: "Headcount", metric: "Headcount", value: "214", change: "+3.2%" },
        { id: "open-roles-stat", type: "stats", title: "Open Roles", metric: "Open Roles", value: "18", change: "-4.0%" },
        { id: "attrition-stat", type: "stats", title: "Attrition", metric: "Attrition", value: "6.1%", change: "-0.8%" },
        { id: "team-table", type: "table", title: "Team Members", fields: ["name", "role", "department", "status"] }
      ]
    }
  },
  {
    id: "admin",
    name: "Admin Panel",
    description: "Internal admin controls and user management",
    category: "Operations",
    complexity: "Moderate",
    version: 1,
    keywords: ["admin", "panel", "users", "permissions", "settings", "internal"],
    schema: {
      layout: "admin",
      components: [
        { id: "users-stat", type: "stats", title: "Active Users", metric: "Users", value: "842", change: "+4.5%" },
        { id: "roles-stat", type: "stats", title: "Roles", metric: "Roles", value: "12", change: "0%" },
        { id: "audit-chart", type: "chart", title: "Activity Log" },
        { id: "users-table", type: "table", title: "User Accounts", fields: ["name", "email", "role", "status"] }
      ]
    }
  },
  {
    id: "inventory",
    name: "Inventory System",
    description: "Stock levels, SKUs, and warehouse tracking",
    category: "Operations",
    complexity: "Simple",
    version: 1,
    keywords: ["inventory", "stock", "warehouse", "sku", "supply", "items"],
    schema: {
      layout: "inventory",
      components: [
        { id: "stock-stat", type: "stats", title: "In Stock", metric: "SKUs", value: "3,420", change: "+2.1%" },
        { id: "low-stat", type: "stats", title: "Low Stock", metric: "Alerts", value: "28", change: "-12%" },
        { id: "inventory-table", type: "table", title: "Inventory Items", fields: ["name", "sku", "quantity", "status"] }
      ]
    }
  }
]
