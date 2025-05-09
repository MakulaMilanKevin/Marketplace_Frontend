import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <motion.div className="flex justify-center items-center min-h-[50vh]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <Loader2 className="animate-spin h-8 w-8 text-error" />
            </motion.div>
        );
    }

    if (!user) {
        return <Navigate to="/bejelentkezes" replace />;
    }

    return children;
};

export default ProtectedRoute;