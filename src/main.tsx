import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/global.css'
import RouterConfig from './router/RouterConfig.tsx'
import AuthProvider from './context/providers/AuthProvider.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <Toaster
        richColors={true}
        closeButton={true}
      />
      <RouterConfig />
    </AuthProvider>
  </StrictMode>,
)
