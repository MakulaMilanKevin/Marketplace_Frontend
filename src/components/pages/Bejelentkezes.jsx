import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Bejelentkezes = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(credentials.email, credentials.password);
            navigate('/');
        } catch (error) {
            setError(error.message || 'Sikertelen bejelentkezés');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div className="flex grow justify-center items-center content-center bg-gradient-to-br from-primary/10 to-secondary/10 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body p-8">
                    <div className="text-center space-y-4 mb-8">
                        <LogIn className="h-12 w-12 mx-auto text-primary" />
                        <h1 className="text-3xl font-bold">Üdv újra!</h1>
                        <p className="text-base-content/70">Kérjük, jelentkezz be a folytatáshoz</p>
                    </div>

                    {error && (
                        <div className="alert alert-error animate-fade-in-down">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email cím</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-base-content/50" />
                                <input
                                    type="email"
                                    placeholder="email@pelda.hu"
                                    className="input input-bordered pl-10 w-full"
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Jelszó</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-base-content/50" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="input input-bordered pl-10 w-full"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {!isLoading && <LogIn className="mr-2 h-5 w-5" />}
                            Bejelentkezés
                        </button>
                    </form>

                    <div className="divider my-6">Még nincs fiókod?</div>

                    <Link
                        to="/regisztracio"
                        className="btn btn-outline btn-secondary w-full"
                    >
                        Regisztráció
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Bejelentkezes;