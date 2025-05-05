import { useState } from 'react';
import { ShoppingCart, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8000/';

const TermekKartya = ({ termek }) => {
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <figure className="relative aspect-square">
                <img
                    src={API_URL + termek.kep}
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
                    <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => toast('Termék a kosárhoz adva!')}
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Kosárba
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermekKartya;