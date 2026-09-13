import { AuthProvider } from '@/contexts/AuthProvider'
import { LanguageProvider } from '@/contexts/LanguageProvider'
import AppRoutes from '@/routes/AppRoutes'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </LanguageProvider>
  )
}


export default App


