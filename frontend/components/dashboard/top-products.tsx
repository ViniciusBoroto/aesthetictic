"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TopProductsProps {
  className?: string
}

export default function TopProducts({ className }: TopProductsProps) {
  // Fictional data for the chart
  const [productsData] = useState([
    { name: "Consultoria Financeira", sales: 145, revenue: 29000 },
    { name: "Plano Premium", sales: 120, revenue: 24000 },
    { name: "Análise de Investimentos", sales: 95, revenue: 19000 },
    { name: "Gestão Patrimonial", sales: 80, revenue: 16000 },
    { name: "Plano Básico", sales: 65, revenue: 13000 },
  ])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Produtos Mais Vendidos</CardTitle>
        <CardDescription>Top 5 produtos com maior volume de vendas</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ChartContainer
          config={{
            "product-a": {
              label: "Consultoria Financeira",
              color: "hsl(var(--chart-1))",
            },
            "product-b": {
              label: "Plano Premium",
              color: "hsl(var(--chart-2))",
            },
            "product-c": {
              label: "Análise de Investimentos",
              color: "hsl(var(--chart-3))",
            },
            "product-d": {
              label: "Gestão Patrimonial",
              color: "hsl(var(--chart-4))",
            },
            "product-e": {
              label: "Plano Básico",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} />
              <ChartTooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                content={
                  <ChartTooltipContent
                    formatValue={(value, name) =>
                      name === "revenue"
                        ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
                        : `${value} unidades`
                    }
                  />
                }
              />
              <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={40} fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
