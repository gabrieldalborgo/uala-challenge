import Layout from './components/layout/layout'

function App() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Welcome to My App</h1>
          <div className="grid gap-6">
            <div className="p-6 bg-card rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              <p className="text-muted-foreground">
                This is a React application with a sidebar navigation. You can toggle the sidebar using the button in the top-left corner or by pressing Cmd/Ctrl + B.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Responsive sidebar navigation</li>
                <li>• Dark/light mode support</li>
                <li>• Keyboard shortcuts</li>
                <li>• Mobile-friendly design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
