import AppProvider from "@/app/Provider";
import AppRoutes from "@/app/routes";

function App() {
  return (
    <AppProvider>
      <AppRoutes/>
    </AppProvider>
  )
}

export default App