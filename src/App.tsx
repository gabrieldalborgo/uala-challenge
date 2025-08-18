import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Home } from './pages/home'
import Layout from './components/layout/layout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Home />
      </Layout>
    </QueryClientProvider>
  )
}

export default App
