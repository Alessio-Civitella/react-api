function AppCard({article, index, apiUrl, handleDelete}) {
    return (
        <div  className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                {article.image && <img src={`${apiUrl}/${article.image}`} alt="Immagine articolo" className="card-img-top mb-3" />}
                <p className="card-text">{article.content}</p>
                <button className="btn btn-danger" onClick={() => handleDelete(article.id)}>Cancella</button>
            </div>
        </div>
    )
}

export default AppCard;