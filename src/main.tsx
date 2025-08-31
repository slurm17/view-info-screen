import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/global.ts'
// HACER SIEMPRE EL BUILD CON CMD ADMINISTRADOR PARA EVITAR PROBLEMAS DE PERMISOS

// fetch('http://localhost:3000/api/hello')
//   .then(res => res.json())
//   .then(data => console.log(data.message))


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

