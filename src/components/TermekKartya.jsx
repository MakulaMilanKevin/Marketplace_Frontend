import { useEffect, useState } from 'react';
import { DiffIcon, InfoIcon, Trash } from 'lucide-react';
import { API_URL, useAuth } from '../context/AuthContext';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const TermekKartya = ({ termek, id, refresh }) => {
    const { user, setTermekMod } = useAuth();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const [showLoadingDel, setShowLoadingDel] = useState(false);

    const modifySelf = () => {
        setTermekMod(termek);
        navigate('/modositas');
    }

    const fetchOwner = async () => {
        if (!user)
            navigate('/regisztracio');

        setShowLoading(true);
        const response = await fetch(`${API_URL}/userapi/profil/${termek.user_id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        });

        if (response.ok)
            setUserInfo(await response.json());
        else
            throw new Error("A felhasználó nem létezik!");
    }

    const deleteSelf = async () => {
        setShowLoadingDel(true);
        const response = await fetch(`${API_URL}/termekapi/delete/${termek.termekek_id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${user.token}` }
        });

        if (response.ok)
            refresh();
        else
            throw new Error("Hiba történt a törlés közben!");

        setShowLoadingDel(false);
    }

    useEffect(() => {
        if (userInfo && showLoading) {
            document.getElementById(`modal-${id}`).showModal();
            setShowLoading(false);
        }
    }, [userInfo]);

    return (
        <div className="card card-compact bg-base-100">
            <figure className="relative aspect-square">
                <img
                    src={`${API_URL}/${termek.kep}`}
                    alt={termek.cim}
                    className="w-full h-full object-cover rounded-t-xl"
                    loading="lazy"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h2 className="text-xl font-bold text-white truncate">
                        {termek.cim}
                    </h2>
                </div>
            </figure>

            <div className="card-body">
                <p className="text-sm text-base-content/80 line-clamp-3 mb-4">
                    {termek.description}
                </p>

                <div className="card-actions justify-between items-center">
                    <div className="badge badge-lg badge-primary">
                        {termek.ar?.toLocaleString('hu-HU')} Ft
                    </div>
                    {
                        (user && user.user_id != termek.user_id || !user) &&
                        <button
                            className="btn btn-primary btn-sm flex flex-row flex-nowrap justify-center items-center content-center"
                            onClick={fetchOwner}
                        >
                            <InfoIcon className="mr-2 h-4 w-4" />
                            {showLoading ? <span className="loading loading-dots loading-lg"></span> : "Részletek"}
                        </button>
                    }
                    {
                        (user && user.user_id == termek.user_id) &&
                        <button
                            className="btn btn-success btn-sm flex flex-row flex-nowrap justify-center items-center content-center"
                            onClick={modifySelf}
                        >
                            <DiffIcon className="mr-2 h-4 w-4" />
                            Módosítás
                        </button>
                    }
                    {
                        (user && user.user_id == termek.user_id) &&
                        <button
                            className="btn btn-error btn-sm flex flex-row flex-nowrap justify-center items-center content-center"
                            onClick={deleteSelf}
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            {showLoadingDel ? <span className="loading loading-dots loading-lg"></span> : "Törlés"}
                        </button>
                    }
                </div>
                <Modal userInfo={userInfo} id={id} />
            </div>
        </div>
    );
};

export default TermekKartya;