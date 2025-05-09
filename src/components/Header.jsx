import { Link } from 'react-router-dom';
import { DARK, useAuth } from '../context/AuthContext';
import { ShoppingCart, LogIn, LogOut, PlusCircle, User, Menu } from 'lucide-react';
import Tema from './Tema';

const Header = () => {
    const { user, logout, theme } = useAuth();

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

    //<span>VendoShop</span>

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 flex-nowrap">
            <div className="container mx-auto">
                <div className="navbar-start w-full">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <Menu className="h-5 w-5" />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                            <li>
                                <Tema />
                            </li>
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost">
                        <div className="flex flex-row flex-nowrap justify-center items-center content-center gap-3">
                            <ShoppingCart className="w-6 h-6" />
                            {
                                theme == DARK ?
                                    <img src="./src/assets/VendoBanner.png" className="h-5" /> :
                                    <img src="./src/assets/VendoBannerBlack.png" className="h-5" />
                            }
                        </div>
                    </Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal items-center px-1">
                        {navLinks}
                        <li>
                            <Tema />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;