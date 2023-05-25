import { Link } from 'react-router-dom'

const Recipe = ({ id, name, img, category, tags }) => {

  // const truncateText = (text, maxLength) => {
  //   if (text.length <= maxLength) {
  //     return text;
  //   }
  
  //   const truncatedText = text.slice(0, maxLength);
  //   const lastSpaceIndex = truncatedText.lastIndexOf(' ');
  
  //   if (lastSpaceIndex === -1) {
  //     return truncatedText;
  //   }
  
  //   return truncatedText.slice(0, lastSpaceIndex) + '...';
  // };

  // const newOverview = truncateText(overview, 200)
  let newTags;
  if (tags) {
    newTags = tags.replace(/,/g, ', ')
  } else {
    tags
  }

  return (
    <article className='recipe'>
      <div className="img-container">
        <img src={img} alt={name} className='recipe-img' />
      </div>
      <div className="recipe-footer">
        <h3>{name}</h3>
        <Link to={`/${category}`} className='btn-details'>{category}</Link>
        <p>{newTags}</p>
        <Link to={`/recipe/${id}`} className='btn btn-white'>details</Link>
      </div>
    </article>
  )
}

export default Recipe