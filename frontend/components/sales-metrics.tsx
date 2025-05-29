"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, DollarSign, Target, Package, TrendingUp } from "lucide-react"

interface SalesMetricsProps {
  className?: string
}

export default function SalesMetrics({ className }: SalesMetricsProps) {
  const [salesTarget, setSalesTarget] = useState("R$ 0,00")
  const [salesValue, setSalesValue] = useState("R$ 0,00")
  const [salesPercentage, setSalesPercentage] = useState(0)
  const [isPositive, setIsPositive] = useState(true)
  const [topProductQuantity, setTopProductQuantity] = useState(0)
  const [topProductName, setTopProductName] = useState("Produto A")
  const [topProductProfit, setTopProductProfit] = useState("R$ 0,00")

  useEffect(() => {
    // Simulate fetching data
    // In a real application, this would be fetched from an API
    const fetchData = () => {
      // Example values
      const target = 10000
      const current = 7500

      // Format currency
      setSalesTarget(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(target),
      )

      setSalesValue(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(current),
      )

      // Calculate percentage
      const percentage = Math.round((current / target) * 100)
      setSalesPercentage(percentage)
      setIsPositive(percentage >= 75) // Consider positive if at least 75% of target

      // Set top product data
      setTopProductQuantity(120)
      setTopProductName("Produto A")
      setTopProductProfit(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(3600),
      )
    }

    fetchData()
  }, [])

  return (
    <div className={`grid gap-4 md:grid-cols-2 ${className}`}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Meta de Vendas</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{salesTarget}</div>
          <p className="text-xs text-muted-foreground">Meta anual de vendas</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vendas Realizadas</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{salesValue}</div>
          <div className="flex items-center pt-1">
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-rose-500" />
            )}
            <span className={`text-xs ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
              {salesPercentage}% da meta
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Produto Mais Vendido</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topProductQuantity} unidades</div>
          <p className="text-xs text-muted-foreground">{topProductName}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lucro do Produto</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topProductProfit}</div>
          <p className="text-xs text-muted-foreground">Lucro de {topProductName}</p>
        </CardContent>
      </Card>
    </div>
  )
}
