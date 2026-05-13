import { useState, useEffect } from 'react';
import { Save, UserCircle, MapPin, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ArtisanProfile = () => {
  const [profile, setProfile] = useState({ bio: '', municipality: '', profilePicture: '' });
  const user = JSON.parse(localStorage.getItem('user'));
const navigate = useNavigate();

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/artisans/${user.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // <--- ESTO FALTABA
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (err) { console.error("Error cargando perfil", err); }
  };
  fetchProfile();
}, [user.userId]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setProfile({ ...profile, profilePicture: reader.result });
    if (file) reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/artisans/update/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        alert("¡Perfil actualizado con éxito!");
        // REDIRECCIÓN AL DASHBOARD
        navigate('/artesano/dashboard');
      }
    } catch (err) {
      alert("Error al conectar con el servidor.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <form onSubmit={handleSave} className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
        <div className="flex flex-col items-center mb-10">
          <div className="relative group cursor-pointer">
            {profile.profilePicture ? (
              <img src={profile.profilePicture} className="w-32 h-32 rounded-full object-cover border-4 border-raices-green" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                <UserCircle size={80} />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-raices-brown text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform">
              <Camera size={20} /><input type="file" hidden onChange={handleImage} />
            </label>
          </div>
          <h2 className="font-serif text-3xl font-bold text-raices-brown mt-4">Mi Identidad Artesanal</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Mi Historia / Biografía</label>
            <textarea
              className="w-full p-6 rounded-3xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green"
              rows="5"
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Comunidad u Origen</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green"
                value={profile.municipality}
                onChange={(e) => setProfile({...profile, municipality: e.target.value})}
              />
            </div>
          </div>
          <button className="w-full bg-[#5D4037] text-white py-5 rounded-2xl font-bold hover:bg-[#4E342E] shadow-xl flex justify-center items-center gap-2">
            <Save size={20} /> Guardar Perfil Público
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtisanProfile;