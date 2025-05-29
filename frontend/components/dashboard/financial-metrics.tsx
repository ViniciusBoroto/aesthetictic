"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, DollarSign, Wallet, CreditCard, PiggyBank } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface FinancialMetricsProps {
  className?: string
}

export default function FinancialMetrics({ className }: FinancialMetricsProps) {
  // Fictional financial data
  const financialData = {
    revenue: {
      current: "R$ 75.450,00",
      target: "R$ 100.000,00",
      percentage: 75,
      trend: 12.5,
      isPositive: true,
    },
    expenses: {
      current: "R$ 42.380,00",
      percentage: 56,
      trend: -3.2,
      isPositive: true,
    },
    profit: {
      current: "R$ 33.070,00",
      percentage: 44,
      trend: 8.7,
      isPositive: true,
    },
    investments: {
      current: "R$ 120.500,00",
      trend: 5.3,
      isPositive: true,
    },
  }

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          <DollarSign className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{financialData.revenue.current}</div>
          <div className="mt-2">
            <Progress value={financialData.revenue.percentage} className="h-2" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{financialData.revenue.percentage}% da meta</span>
            <span className="font-medium text-muted-foreground">Meta: {financialData.revenue.target}</span>
          </div>
          <div className="mt-2 flex items-center text-xs">
            {financialData.revenue.isPositive ? (
              <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3 text-rose-500" />
            )}
            <span className={financialData.revenue.isPositive ? "text-emerald-500" : "text-rose-500"}>
              {financialData.revenue.trend}% em relação ao mês anterior
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas</CardTitle>
          <CreditCard className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{financialData.expenses.current}</div>
          <div className="mt-2">
            <Progress value={financialData.expenses.percentage} className="h-2 bg-muted" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{financialData.expenses.percentage}% da receita</span>
          </div>
          <div className="mt-2 flex items-center text-xs">
            {!financialData.expenses.isPositive ? (
              <ArrowUpIcon className="mr-1 h-3 w-3 text-rose-500" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3 text-emerald-500" />
            )}
            <span className={!financialData.expenses.isPositive ? "text-rose-500" : "text-emerald-500"}>
              {Math.abs(financialData.expenses.trend)}% em relação ao mês anterior
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
          <Wallet className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{financialData.profit.current}</div>
          <div className="mt-2">
            <Progress value={financialData.profit.percentage} className="h-2" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Margem de {financialData.profit.percentage}%</span>
          </div>
          <div className="mt-2 flex items-center text-xs">
            {financialData.profit.isPositive ? (
              <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3 text-rose-500" />
            )}
            <span className={financialData.profit.isPositive ? "text-emerald-500" : "text-rose-500"}>
              {financialData.profit.trend}% em relação ao mês anterior
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Investimentos</CardTitle>
          <PiggyBank className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{financialData.investments.current}</div>
          <div className="mt-4 flex items-center text-xs">
            {financialData.investments.isPositive ? (
              <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3 text-rose-500" />
            )}
            <span className={financialData.investments.isPositive ? "text-emerald-500" : "text-rose-500"}>
              Rendimento de {financialData.investments.trend}% no mês
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
