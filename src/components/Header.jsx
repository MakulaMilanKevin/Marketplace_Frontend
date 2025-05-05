import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ShoppingCart, LogIn, LogOut, PlusCircle, User, Menu } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();

    const navLinks = (
        <>
            {user ? (
                <>
                    <li>
                        <Link to="/feltoltes">
                            <PlusCircle className="h-4 w-4" />
                            Termék feltöltés
                        </Link>
                    </li>
                    <li>
                        <button onClick={logout}>
                            <LogOut className="h-4 w-4" />
                            Kijelentkezés ({user.username})
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/bejelentkezes">
                            <LogIn className="h-4 w-4" />
                            Bejelentkezés
                        </Link>
                    </li>
                    <li>
                        <Link to="/regisztracio">
                            <User className="h-4 w-4" />
                            Regisztráció
                        </Link>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            <div className="container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <Menu className="h-5 w-5" />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-xl">
                       <ShoppingCart className="h-6 w-6" />
                       <span>Femboy Marketplace</span>
                    </Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                       {navLinks}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;