import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => setRepositories(response.data))
      .catch(error => console.error(error));
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        url: 'https://github.com/ricardoaruiz/gostack2020-N01D02-frontend-reactjs',
        title: `Desafio: Conceitos do ReactJS ${Date.now()}`,
        techs: ['Javascript', 'ReactJS']
      });
      setRepositories([ ...repositories, response.data ]);
    } catch(error) {
      console.lerror(error);
      alert('Problema ao cadastrar um novo repositório. Tente mais tarde');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));      
    } catch(error) {
      console.lerror(error);
      alert('Problema ao remover um repositório. Tente mais tarde');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button 
              type="button"
              onClick={() => handleRemoveRepository(repository.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
