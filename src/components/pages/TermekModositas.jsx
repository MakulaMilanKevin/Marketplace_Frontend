import { useState, useRef, useEffect } from 'react';
import { API_URL, useAuth } from '../../context/AuthContext';
import { ImagePlus, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TermekModositas = () => {
    const navigate = useNavigate();

    const { termekMod } = useAuth();

    const [form, setForm] = useState({
        cim: termekMod.cim,
        description: termekMod.description,
        ar: termekMod.ar
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const fileInput = useRef();

    const toDataUrl = (url, callback) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            callback(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Csak képek tölthetők fel!');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
            setImage(file);
        };
        reader.readAsDataURL(file);
        console.log(file);
    };

    const handleImageInit = () => {
        toDataUrl(`${API_URL}/${termekMod.kep}`, function (blob) {
            const file = new File([blob], `image.${blob.type.split("/")[1]}`, {
                type: blob.type,
            });
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                toast.error('Csak képek tölthetők fel!');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
                setImage(file);
            };
            reader.readAsDataURL(file);
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error('Bejelentkezés szükséges!');

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('cim', form.cim);
            formData.append('description', form.description);
            formData.append('ar', form.ar);
            if (image) formData.append('image', image);

            const response = await fetch(`${API_URL}/termekapi/update/${termekMod.termekek_id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Hiba a feltöltés során');
            }

            toast.success('Termék sikeresen feltöltve!');
            navigate("/");
            setForm({ cim: '', description: '', ar: '' });
            setImage(null);
            setPreview(null);
            fileInput.current.value = '';
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!termekMod || !user)
            navigate("/");
        else
            handleImageInit();
    }, []);

    return (
        <motion.div className="flex grow gap-5 flex-col justify-center items-center content-center bg-gradient-to-br from-primary/10 to-secondary/10 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {
                termekMod &&
                <div className="max-w-[32rem] w-full mx-auto px-4">
                    <div className="card bg-base-100 shadow-xl w-full">
                        <div className="card-body">
                            <h1 className="card-title text-3xl mb-2">Termék módosítása</h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Termék neve*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Pl. Retro póló"
                                        className="input input-bordered"
                                        value={form.cim}
                                        onChange={(e) => setForm({ ...form, cim: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Leírás*</span>
                                    </label>
                                    <textarea
                                        placeholder="Termék részletei..."
                                        className="textarea textarea-bordered h-20"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Ár (Ft)*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="3000"
                                        className="input input-bordered"
                                        value={form.ar}
                                        onChange={(e) => setForm({ ...form, ar: e.target.value })}
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <div
                                        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors"
                                        onClick={() => fileInput.current.click()}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInput}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImage}
                                        />
                                        {preview ? (
                                            <div className="relative">
                                                <img
                                                    id="imageId"
                                                    src={preview}
                                                    alt="Előnézet"
                                                    className="max-h-64 mx-auto rounded-lg"
                                                    crossOrigin="anonymous"
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-circle btn-xs absolute top-2 right-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreview(null);
                                                        setImage(null);
                                                    }}
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="py-8">
                                                <ImagePlus className="h-12 w-12 mx-auto mb-4 text-base-content/50" />
                                                <p className="font-medium">Húzd ide a képet vagy kattints</p>
                                                <p className="text-sm text-base-content/50">(Max 15MB)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full mt-6"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : 'Módosítás'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </motion.div>
    );
};

export default TermekModositas;