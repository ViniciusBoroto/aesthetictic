import type { Metadata } from "next"
import DashboardPage from "./dashboard-page"

export const metadata: Metadata = {
  title: "Dashboard Financeiro",
  description: "Visualização de dados financeiros e métricas de vendas",
}

export default function Page() {
  return <DashboardPage />
}
