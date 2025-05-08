"use client"

import { useState } from "react"
import SalesOverview from "@/components/dashboard/sales-overview"
import TopProducts from "@/components/dashboard/top-products"
import FinancialMetrics from "@/components/dashboard/financial-metrics"
import RecentTransactions from "@/components/dashboard/recent-transactions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, DownloadIcon, FilterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Sidebar from "@/components/layout/sidebar"
import DashboardHeader from "@/components/layout/dashboard-header"

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState("month")

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard Financeiro</h2>
              <p className="text-muted-foreground">Visão geral das suas finanças e vendas</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>Maio 2025</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <FilterIcon className="h-3.5 w-3.5" />
                <span>Filtros</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <DownloadIcon className="h-3.5 w-3.5" />
                <span>Exportar</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="analytics">Análise</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <FinancialMetrics />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <SalesOverview className="col-span-7 lg:col-span-4" />
                <TopProducts className="col-span-7 lg:col-span-3" />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <RecentTransactions className="col-span-7 lg:col-span-4" />

                <Card className="col-span-7 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Metas Financeiras</CardTitle>
                    <CardDescription>Progresso das suas metas financeiras</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <GoalItem title="Receita Mensal" current={75450} target={100000} percentage={75} />
                      <GoalItem title="Novos Clientes" current={28} target={50} percentage={56} format="numeric" />
                      <GoalItem title="Redução de Custos" current={12000} target={20000} percentage={60} />
                      <GoalItem title="Margem de Lucro" current={44} target={50} percentage={88} format="percentage" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Detalhada</CardTitle>
                  <CardDescription>Análise detalhada das suas finanças e vendas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Conteúdo da análise detalhada será exibido aqui.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios</CardTitle>
                  <CardDescription>Relatórios financeiros e de vendas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Relatórios serão exibidos aqui.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Alertas e notificações importantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Notificações serão exibidas aqui.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

interface GoalItemProps {
  title: string
  current: number
  target: number
  percentage: number
  format?: "currency" | "percentage" | "numeric"
}

function GoalItem({ title, current, target, percentage, format = "currency" }: GoalItemProps) {
  const formatValue = (value: number) => {
    if (format === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value)
    } else if (format === "percentage") {
      return `${value}%`
    } else {
      return value.toString()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm text-muted-foreground">
          {formatValue(current)} / {formatValue(target)}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/10">
        <div
          className={cn(
            "h-full transition-all",
            percentage >= 90
              ? "bg-emerald-500"
              : percentage >= 66
                ? "bg-primary"
                : percentage >= 33
                  ? "bg-amber-500"
                  : "bg-rose-500",
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
