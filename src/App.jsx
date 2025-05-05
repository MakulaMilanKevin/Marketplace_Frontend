import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Kezdooldal from './pages/Kezdooldal';
import Bejelentkezes from './pages/Bejelentkezes';
import Regisztracio from './pages/Regisztracio';
import TermekFeltoltes from './pages/TermekFeltoltes';
// import Footer from './components/Footer';

const navbarHeight = '4rem';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-base-200">
          <Header />
           <main
            className="flex-grow container mx-auto px-4 py-8"
             style={{ paddingTop: `calc(1rem + ${navbarHeight})` }}
           >
            <Routes>
              <Route path="/" element={<Kezdooldal />} />
              <Route path="/bejelentkezes" element={<Bejelentkezes />} />
              <Route path="/regisztracio" element={<Regisztracio />} />
              <Route
                path="/feltoltes"
                element={
                  <ProtectedRoute>
                    <TermekFeltoltes />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;