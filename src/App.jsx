import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
const apiUrl = "http://localhost:3000" 

function App() {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: '',
  });
  const [articles, setArticles] = useState([]);

  const getPost = () => {
    axios.get(`${apiUrl}/posts`).then((Response) => {
      console.log(Response.data.data);
      setArticles(Response.data.data)
    })
  }
  useEffect(() => {getPost()},[])

  

  const handleChange = (e) => {
    const { name, value,} = e.target;
    
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.title && formData.content) {
      setArticles([...articles, formData]);
      setFormData({
        title: '',
        image: '',
        content: '',
      });
    }
  };

  const handleDelete = (index) => {
    const updatedArticles = articles.filter((_, i) => i !== index);
    setArticles(updatedArticles);
  };

  useEffect(() => {
    if (formData.publish) {
      alert('Hai selezionato di pubblicare l’articolo!');
    }
  }, [formData.publish]);

  return (
    <div className="container mt-5">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titolo</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Inserisci il titolo"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">URL Immagine</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Inserisci l'URL dell'immagine"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Contenuto</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Inserisci il contenuto"
          />
        </div>
        <button type="submit" className="btn btn-primary">Aggiungi</button>
      </form>

      <div className="mt-4">
        {Array.isArray(articles) && articles.map((article, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              {article.image && <img src={`${apiUrl}/${article.image}`} alt="Immagine articolo" className="card-img-top mb-3" />}
              <p className="card-text">{article.content}</p>
              <button className="btn btn-danger" onClick={() => handleDelete(index)}>Cancella</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
