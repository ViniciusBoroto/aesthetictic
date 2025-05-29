"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SalesOverviewProps {
  className?: string
}

export default function SalesOverview({ className }: SalesOverviewProps) {
  const [salesData, setSalesData] = useState<Array<{ month: string; sales: number }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Fetch data from API
        const response = await fetch("http://localhost:8000/TotalSales/month")
        const data = await response.json()

        // Transform data for chart
        const formattedData = Object.entries(data).map(([month, sales]) => ({
          month,
          sales: Number(sales),
        }))

        setSalesData(formattedData)
      } catch (err) {
        console.error("Erro ao buscar dados de vendas mensais:", err)
        setError("Não foi possível carregar os dados de vendas")

        // Fallback data for preview
        setSalesData([
          { month: "2025-01", sales: 120 },
          { month: "2025-02", sales: 180 },
          { month: "2025-03", sales: 150 },
          { month: "2025-04", sales: 210 },
          { month: "2025-05", sales: 190 },
          { month: "2025-06", sales: 250 },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSalesData()
  }, [])

  // Format month labels (e.g., "2025-04" to "Abril")
  const formatMonth = (month: string) => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

    try {
      const [year, monthNum] = month.split("-")
      return `${months[Number.parseInt(monthNum) - 1]}/${year.slice(2)}`
    } catch (e) {
      return month
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Vendas ao Longo do Ano</CardTitle>
        <CardDescription>Quantidade de vendas realizadas por mês</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        {isLoading ? (
          <div className="flex h-[350px] items-center justify-center">
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        ) : error ? (
          <div className="flex h-[350px] items-center justify-center">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <ChartContainer
            config={{
              sales: {
                label: "Vendas",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickFormatter={formatMonth} axisLine={false} tickLine={false} tickMargin={10} />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatValue={(value) => `${value} unidades`}
                      formatLabel={(label) => formatMonth(label)}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name="sales"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{
                    r: 5,
                    strokeWidth: 2,
                    fill: "hsl(var(--background))",
                  }}
                  activeDot={{
                    r: 7,
                    strokeWidth: 0,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
