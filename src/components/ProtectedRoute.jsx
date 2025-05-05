import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; 
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="animate-spin h-8 w-8 text-error" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/bejelentkezes" replace />;
    }

    return children;
};

export default ProtectedRoute;