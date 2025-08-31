import routes from './constants/routes'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/main/Main'
import MainLayout from './components/mainLayout'
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          {/* <Route path="/" element={<Navigate to={routes.MAIN} replace />} /> */}
          <Route path={routes.MAIN} element={<Main />} />
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
