import AnimatedRoutes from './components/AnimatedRoutes';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';

// import Footer from './components/Footer';

const navbarHeight = '4rem';

function App() {
  const { theme } = useAuth();

  return (
    <>
      <div data-theme={theme} className="flex flex-col grow w-full h-full">
        <Header />
        <AnimatedRoutes />
      </div>
    </>
  );
}

export default App;