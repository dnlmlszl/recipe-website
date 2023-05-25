import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='


const Singlerecipe = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    setLoading(true)
    const getRecipe = async () => {
      try {
        const response = await fetch(`${url}${id}`)
        const data = await response.json()

        if (data.meals) {
          const {
            strArea: nationality,
            strCategory: category,
            strInstructions: instructions,
            strMeal: name,
            strMealThumb: img,
            strYoutube: video,
            strTags: tags,
            strIngredient1, 
            strIngredient2, 
            strIngredient3, 
            strIngredient4, 
            strIngredient5, 
            strIngredient6, 
            strIngredient7, 
            strIngredient8, 
            strIngredient9, 
            strIngredient10, 
            strIngredient11, 
            strIngredient12 
          } = data.meals[0]
          const ingredients = [
            strIngredient1, 
            strIngredient2, 
            strIngredient3, 
            strIngredient4, 
            strIngredient5, 
            strIngredient6, 
            strIngredient7, 
            strIngredient8, 
            strIngredient9, 
            strIngredient10, 
            strIngredient11, 
            strIngredient12 
          ].join(", ")
          const newRecipe = {
            nationality,
            category,
            instructions,
            name,
            img,
            video,
            tags,
            ingredients
          }
          setRecipe(newRecipe)
        } else {
          setRecipe(null)
        }
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    getRecipe()
  }, [id])

  if (loading) {
    return <Loading />
  }

  if (!recipe) {
    return (
      <h2 className="section-title">no recipe to display</h2>
    )
  }

  const { 
    nationality,
    category,
    instructions,
    name,
    img,
    video,
    tags,
    ingredients 
  } = recipe

  function convertToEmbedUrl(url) {
    // Extract the video ID from the YouTube URL
    const videoId = url.match(/(?:\?v=|\/embed\/|\.be\/|\/\d{1,2}\/|\/embed\/|\.be\/|\/\d{1,2}\/|youtu\.be\/|\/embed\/|\.be\/|\/\d{1,2}\/|youtube\.com\/v\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/|\/user\/\S+|\/user\/\S+|youtube\.com\/v\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/|\/user\/\S+|\/user\/\S+)([^#\&\?\n< ]{11})/i);
    
    if (videoId && videoId.length > 1) {
      // Construct the embeddable URL
      const embedUrl = `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&controls=0&showinfo=0&mute=1`;
      
      return embedUrl;
    }
    
    return null; // Return null if the URL format is not recognized
  }

  convertToEmbedUrl(video)

  return (
    <section className='section recipe-section'>
      <Link to='/' className='btn btn-white'>back home</Link>
      <h2 className="section-title">{name}</h2>
      <div className="meal">
        <img src={img} alt={name} className='img' />
        <div className="recipe-info">
          <p>
            <span className="recipe-data">Name: </span>
            {name}
          </p>
          <p>
            <span className="recipe-data">Nationality: </span>
            {nationality}
          </p>
          <p>
            <span className="recipe-data">Category: </span>
            {category}
          </p>
          <p>
            <span className="recipe-data">Ingredients: </span>
            {ingredients}
          </p>
          <p>
            <span className="recipe-data">Tags: </span>
            {tags && tags.replace(/,/g, ", ")}
          </p>
        </div>
        <div className="overview-container">
          <iframe src={convertToEmbedUrl(video)} 
            width={1000} 
            height={750} 
            title='Embedded Youtube Player' 
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen           
          />
          
          <p className='overview'>
            <span className="recipe-data">Instructions: <br /></span>
            {instructions}
          </p>

        </div>
      </div>
    </section>
  )
}

export default Singlerecipe