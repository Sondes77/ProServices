import React, { useState } from 'react';
import { villesEtRegions } from '../components/villesRegions';
const Home = () => {
  const [ville, setVille] = useState('');
  const [region, setRegion] = useState('');

  const handleVilleChange = (e) => {
    setVille(e.target.value);
    setRegion('');
  };

  const handleRecherche = (e) => {
    e.preventDefault();
    console.log('Recherche:', { ville, region });
    // Navigation vers la page de résultats avec les paramètres ?
  };

  return (
    
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow bg-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Trouvez un professionnel près de chez vous</h1>
          <form className="bg-white p-6 rounded shadow-md space-y-4" onSubmit={handleRecherche}>
            <input
              type="text"
              placeholder="Ex: plombier, menuisier..."
              className="w-full p-3 border border-gray-300 rounded"
            />

            <select
              className="w-full p-3 border border-gray-300 rounded"
              value={ville}
              onChange={handleVilleChange}
              required
            >
              <option value="">-- Choisir une ville --</option>
              {Object.keys(villesEtRegions).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>

            <select
              className="w-full p-3 border border-gray-300 rounded"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              disabled={!ville}
              required
            >
              <option value="">-- Choisir une région --</option>
              {ville && villesEtRegions[ville].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <button type="submit" className="btn btn-primary btn-block" >
              Rechercher
            </button>
          </form>
        </div>
        <div className="container mt-5">
            {/* Section des professionnels recommandés */}
            <section>
                <h2 className="text-center mb-5">Nos professionnels recommandés</h2>
                <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card">
                    <img src="https://via.placeholder.com/150" alt="Plombier" className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">Plombier - Tunis</h5>
                        <p className="card-text">Disponible pour toutes réparations de plomberie.</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                    <img src="https://via.placeholder.com/150" alt="Menuisier" className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">Menuisier - Sousse</h5>
                        <p className="card-text">Fabrication et installation de meubles sur mesure.</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                    <img src="https://via.placeholder.com/150" alt="Maçon" className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">Maçon - Sfax</h5>
                        <p className="card-text">Construction, rénovation, et entretien des bâtiments.</p>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
