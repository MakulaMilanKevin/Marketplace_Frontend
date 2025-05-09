import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Regisztracio = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('A jelszavak nem egyeznek');
            return;
        }

        if (formData.password.length < 6) {
            setError('A jelszónak legalább 6 karakter hosszúnak kell lennie');
            return;
        }

        setIsLoading(true);

        try {
            await register(formData.username, formData.email, formData.password);
            navigate('/bejelentkezes');
        } catch (error) {
            setError(error.message || 'Regisztrációs hiba');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div className="flex grow justify-center items-center content-center bg-gradient-to-br from-secondary/10 to-primary/10 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="card w-full max-w-[42rem] bg-base-100 shadow-2xl">
                <div className="card-body p-8">
                    <div className="text-center space-y-4 mb-4">
                        <UserPlus className="h-12 w-12 mx-auto text-secondary" />
                        <h1 className="text-3xl font-bold">Új fiók létrehozása</h1>
                        <p className="text-base-content/70">Csatlakozz hozzánk néhány egyszerű lépéssel</p>
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
                        <div className="flex justify-center items-center content-center flex-col md:flex-row gap-10 md:gap-15">
                            <div className="w-full">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Felhasználónév</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-base-content/50" />
                                        <input
                                            type="text"
                                            placeholder="Becenév"
                                            className="input input-bordered pl-10 w-full"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

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
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Jelszó</span>
                                        <span className="label-text-alt">(min. 6 karakter)</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-base-content/50" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="input input-bordered pl-10 w-full"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Jelszó megerősítése</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-base-content/50" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="input input-bordered pl-10 w-full"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-secondary w-full ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {!isLoading && <UserPlus className="mr-2 h-5 w-5" />}
                            Regisztráció
                        </button>
                    </form>

                    <div className="divider my-6">Már van fiókod?</div>

                    <Link
                        to="/bejelentkezes"
                        className="btn btn-outline btn-primary w-full"
                    >
                        Bejelentkezés
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Regisztracio;