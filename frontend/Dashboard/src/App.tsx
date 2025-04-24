// App.jsx
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  Avatar,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const drawerWidth = 240;

const dataBar = [
  { name: "Jan", uv: 400 },
  { name: "Fev", uv: 300 },
  { name: "Mar", uv: 500 },
];

const dataPie = [
  { name: "Chrome", value: 60 },
  { name: "Firefox", value: 25 },
  { name: "Edge", value: 15 },
];

const COLORS = ["#1976d2", "#9c27b0", "#ff9800"];

export default function App() {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            p: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
          <Typography variant="h6">Seu Nome</Typography>
        </Box>
      </Drawer>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f6f8",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <AppBar
          position="static"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Área dos gráficos */}
        <Box sx={{ flex: 1, display: "flex", p: 3, gap: 3 }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: "white",
              borderRadius: 2,
              p: 2,
              boxShadow: 1,
              minHeight: 360,
            }}
          >
            <Typography variant="subtitle1" mb={2}>
              Vendas por mês
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="uv" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <Box
            sx={{
              flex: 1,
              bgcolor: "white",
              borderRadius: 2,
              p: 2,
              boxShadow: 1,
              minHeight: 360,
            }}
          >
            <Typography variant="subtitle1" mb={2}>
              Uso por navegador
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {dataPie.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
