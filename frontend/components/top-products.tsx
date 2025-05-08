"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TopProductsProps {
  className?: string
}

export default function TopProducts({ className }: TopProductsProps) {
  // In a real application, this would be fetched from an API
  const [productsData, setProductsData] = useState([
    { name: "Produto A", sales: 120, fill: "var(--color-product-a)" },
    { name: "Produto B", sales: 90, fill: "var(--color-product-b)" },
    { name: "Produto C", sales: 70, fill: "var(--color-product-c)" },
    { name: "Produto D", sales: 50, fill: "var(--color-product-d)" },
    { name: "Produto E", sales: 30, fill: "var(--color-product-e)" },
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
              label: "Produto A",
              color: "hsl(var(--chart-1))",
            },
            "product-b": {
              label: "Produto B",
              color: "hsl(var(--chart-2))",
            },
            "product-c": {
              label: "Produto C",
              color: "hsl(var(--chart-3))",
            },
            "product-d": {
              label: "Produto D",
              color: "hsl(var(--chart-4))",
            },
            "product-e": {
              label: "Produto E",
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
                content={<ChartTooltipContent formatValue={(value) => `${value} unidades`} />}
              />
              <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={40} fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
