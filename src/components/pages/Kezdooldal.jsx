import { useEffect, useState } from 'react';
import TermekKartya from '../TermekKartya';
import { Loader2, AlertCircle, Search, Frown } from 'lucide-react';
import { API_URL, useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Kezdooldal = () => {
  const { user } = useAuth();

  const [termekek, setTermekek] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTermekek, setFilteredTermekek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filtereredTermekekOther, setFiltereredTermekekOther] = useState([]);
  const [filteredTermekekMine, setFilteredTermekekMine] = useState([]);

  const [showSelf, setShowSelf] = useState(false);

  const setSelf = (value) => {
    setShowSelf(value.target.checked);
    value.target.checked ?
      setTermekek(filteredTermekekMine) :
      setTermekek(filtereredTermekekOther);
  }

  const fetchTermekek = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_URL}/termekapi/alltermek`);

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.error('Server returned HTML error page');
        throw new Error('A szerver hibát adott vissza. Lehet, hogy karbantartás alatt áll?');
      }

      if (!response.ok) {
        let errorMsg = `Hiba a termékek lekérésekor (HTTP ${response.status})`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) { /* Ignore */ }
        throw new Error(errorMsg);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error('Invalid data format received:', data);
        throw new Error('Érvénytelen adatformátum érkezett a szervertől.');
      }

      if (user) {
        setFilteredTermekekMine([]);
        setFiltereredTermekekOther([]);

        let filtMine = [];
        let filtOther = [];

        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          if (element.user_id == user.user_id)
            filtMine.push(element);
          else
            filtOther.push(element);
        }

        setFilteredTermekekMine(filtMine);
        setFiltereredTermekekOther(filtOther);

        setTermekek(showSelf ? filtMine : filtOther);
        setFilteredTermekek(showSelf ? filtMine : filtOther);
      }
      else {
        setTermekek(data);
        setFilteredTermekek(data);
      }

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setTermekek([]);
      setFilteredTermekek([]);
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchTermekek();
  }, [user]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = termekek.filter(termek =>
      (termek.cim && termek.cim.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (termek.description && termek.description.toLowerCase().includes(lowerCaseSearchTerm))
    );
    setFilteredTermekek(filtered);
  }, [searchTerm, termekek]);

  return (
    <motion.div className="flex grow p-5 gap-5 flex-col justify-start items-center content-center bg-gradient-to-br from-primary/10 to-secondary/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className="mb-8 flex justify-center w-full w-max-[32rem]">
        <div className="form-control items-center w-full gap-3">
          <label className="label">
            <span className="label-text">Termékek keresése</span>
          </label>
          <div className="relative w-full max-w-7xl">

            <input
              type="text"
              placeholder="Írd be a keresett termék nevét vagy leírását..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pr-10"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
          </div>
          {
            user &&
            <div className="flex flex-row gap-3">
              <p>Termékek</p>
              <input type="checkbox" className="toggle"
                onChange={setSelf} />
              <p>Az én termékeim</p>
            </div>
          }
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">

          <span className="loading loading-spinner loading-lg text-primary"></span>

        </div>
      ) : error ? (
        <div role="alert" className="alert alert-error max-w-2xl mx-auto">
          <AlertCircle className="h-6 w-6" />
          <div>
            <h3 className="font-bold">Hiba történt!</h3>
            <div className="text-xs">{error}</div>
          </div>

          <button onClick={fetchTermekek} className="btn btn-sm btn-ghost">
            Újrapróbálás
          </button>
        </div>
      ) : filteredTermekek.length === 0 ? (
        <div className="text-center text-base-content/70 py-10">
          <Frown className="h-16 w-16 mx-auto mb-4" />
          <p className="text-xl font-semibold">Nincs találat.</p>
          <p>Próbálj meg más kulcsszavakat, vagy nézz körül később!</p>
        </div>
      ) : (
        <div className="flex grow relative w-full h-full overflow-y-auto">
          <div className="grid absolute grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-full">
            {
              filteredTermekek.map((termek, key) => (<TermekKartya id={key} key={key} termek={termek} refresh={fetchTermekek} />))
            }
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Kezdooldal;