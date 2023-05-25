import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import RecipeList from '../components/RecipeList'

const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c="

const SingleCategory = () => {
    const { category } = useParams()
    const [loading, setLoading] = useState(false)
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
        setLoading(true)
        const getCategory = async () => {
            try {
                const response = await fetch(`${url}${category}`)
                const data = await response.json()

                if (data.meals) {
                    const newRecipes = data.meals.map((meal) => {
                        const { idMeal, strMeal, strMealThumb } = meal
                        return {id: idMeal, name: strMeal, img: strMealThumb}
                    })
                    setRecipes(newRecipes)
                } else {
                    setRecipes(null)
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        getCategory()
    }, [category])

    if (loading) {
        return <Loading />
    }

    if (!recipes) {
        return (
          <h2 className="section-title">no recipes to display in this category</h2>
        )
    }

  return (
    <div>
        <h2 className='section-title'>{category} specialties</h2>
        <div className="recipes-center">
            {recipes && recipes.map((recipe) => {
                const { id, name, img} = recipe
                return (
                    <article className='recipe' key={id}>
                        <div className="img-container">
                            <img src={img} alt={name} className='recipe-img' />
                        </div>
                        <div className="recipe-footer">
                            <h3>{name}</h3>
                            <h4>{category}</h4>
                            <Link to={`/recipe/${id}`} className='btn'>details</Link>
                        </div>
                    </article>
                )
            })}
        </div>
    </div>
  )
}

export default SingleCategory