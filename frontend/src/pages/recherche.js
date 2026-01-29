import React, { Fragment, useEffect, useState } from 'react';
import { villesEtRegions } from '../components/villesRegions';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import Banner2 from '../components/banner2';
import photo from '../img/photo-1621905251189-08b45d6a269e.avif';

const Resultats = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [ville, setVille] = useState(query.get('ville') || '');
  const [region, setRegion] = useState(query.get('region') || '');
  const [motCle, setMotCle] = useState(query.get('motcle') || '');

  const [resultats, setResultats] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 12;

  useEffect(() => {
    const donneesSimulees = [
        { id: 1, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 2, nom: 'Sami - Électricien', ville: 'Ariana', service: 'Électricité', region: 'El Menzah', motcle: 'Électricité, électricien' },
        { id: 3, nom: 'Mouna - Coiffeuse', ville: 'Tunis', service: 'Coiffure', region: 'El Menzah', motcle: 'Coiffure, coiffeuse'},
        { id: 4, nom: 'Hedi - Mécanicien', ville: 'Sousse', service: 'Mécanique', region: 'Sousse', motcle: 'Mécanique, mécanicien' },
        { id: 5, nom: 'Sara - Esthéticienne', ville: 'Tunis', service: 'Esthétique', region: 'El Menzah', motcle: 'Esthétique, esthéticienne' },
        { id: 6, nom: 'Khaled - Jardinier', ville: 'Ariana', service: 'Jardinage', region: 'El Menzah', motcle: 'Jardinage, jardinier' },
        { id: 7, nom: 'Nadia - Femme de ménage', ville: 'Sfax', service: 'Ménage', region: 'Sfax', motcle: 'Ménage, femme de ménage' },
        { id: 8, nom: 'Omar - Cuisinier', ville: 'Tunis', service: 'Cuisine', region: 'El Menzah', motcle: 'Cuisine, cuisinier' },
        { id: 9, nom: 'Fatma - Garde d\'enfants', ville: 'Ariana', service: 'Garde d\'enfants', region: 'El Menzah', motcle: 'Garde d\'enfants, nourrice' },
        { id: 10, nom: 'Hichem - Plâtrier', ville: 'Sousse', service: 'Plâtrerie', region: 'Sousse', motcle: 'Plâtrerie, plâtrier' },
        { id: 11, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 12, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 13, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 14, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 15, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 16, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 17, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 18, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 19, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 20, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 21, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle: 'plomberie, plombier' },
        { id: 22, nom: 'Ali - Plombier', ville: 'Tunis', service: 'Plomberie', region: 'El Menzah', motcle:'plomberie, plombier' }
    ];

    const filtres = donneesSimulees.filter(
      (item) =>
        (!ville || item.ville.toLowerCase().includes(ville.toLowerCase())) &&
        (!motCle || item.service.toLowerCase().includes(motCle.toLowerCase()) || item.motcle.toLowerCase().includes(motCle.toLowerCase()) || item.nom.toLowerCase().includes(motCle.toLowerCase())) &&
        (!region || item.region.toLowerCase().includes(region.toLowerCase()))
    );

    setResultats(filtres);
    setCurrentPage(1); // reset to page 1 when filters change
  }, [ville, region, motCle]);

  const handleRecherche = (e) => {
    e.preventDefault();
    navigate(`/recherche?ville=${ville}&region=${region}&motcle=${motCle}`);
  };

  // Pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = resultats.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(resultats.length / resultsPerPage);

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="container">
      <Banner2
        heading1={
          <Fragment>
            <span className="home-text114">
              Trouvez des professionnels locaux pour vos besoins
            </span>
          </Fragment>
        }
        content1={
          <Fragment>
            <div className="banner2-container1">
              <form className="hero17-actions" onSubmit={handleRecherche}>
                <input
                  type="text"
                  placeholder="Ex: plombier, menuisier..."
                  value={motCle}
                  onChange={(e) => setMotCle(e.target.value)}
                  className="thq-input hero17-button2 sign-in1-textinput thq-input thq-body-large"
                  id="keywords"
                />
                <select
                  className="thq-button-outline hero17-button2 sign-in1-textinput thq-input thq-body-large"
                  value={ville}
                  onChange={(e) => {
                    setVille(e.target.value);
                    setRegion('');
                  }}
                  required
                >
                  <option value="">-- Choisir une ville --</option>
                  {Object.keys(villesEtRegions).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>

                <select
                  className="thq-button-outline hero17-button2 sign-in1-textinput thq-input thq-body-large"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  disabled={!ville}
                  required
                >
                  <option value="">-- Choisir une région --</option>
                  {ville &&
                    villesEtRegions[ville].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                </select>

                <button
                  type="submit"
                  className="thq-button-filled hero17-button1"
                  id="contact-submit"
                >
                  Rechercher
                </button>
              </form>
            </div>
          </Fragment>
        }
      ></Banner2>

      <div className="container-fluid">
        <Container className="max-w-7xl mx-auto p-4">
          <h2>Résultats de recherche</h2>
          <p>
              Nombre de résultats : {resultats.length}
          </p>
          <p>
            Ville : {ville || 'Non spécifiée'} | Région : {region || 'Non spécifiée'} | Mot-clé :{' '}
            {motCle || 'Non spécifié'}
          </p>

          <Row className="mt-4">
            {currentResults.length > 0 ? (
              currentResults.map((item) => (
                <Col md={3} key={item.id} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={photo} />
                    <Card.Body>
                      <Card.Title>{item.nom}</Card.Title>
                      <Card.Text>Service : {item.service}</Card.Text>
                      <Card.Text>Ville : {item.ville}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>Aucun résultat trouvé.</p>
            )}
          </Row>
          {resultats.length > resultsPerPage && (
          <Row className="justify-content-center ">
            <Pagination className='justify-content-center'>{paginationItems}</Pagination>
          </Row>
        )}
        </Container>
      </div>
    </div>
  );
};

export default Resultats;
