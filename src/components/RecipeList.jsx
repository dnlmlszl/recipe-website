import Loading from './Loading'
import Recipe from './Recipe'
import { useGlobalContext } from '../context'

const RecipeList = () => {
  const { loading, recipes } = useGlobalContext()

  if (loading) {
    return <Loading />
  }
  if (recipes.length < 1) {
    return (
      <h2 className='section-title'>no recipes matched your search criteria</h2>
    )
  }
  return (
    <section className='section'>
      <h2 className="section-title">recipes</h2>
      <div className="recipes-center">
        {recipes && recipes.map((recipe) => {
          return <Recipe key={recipe.id} { ...recipe } />
        })}
      </div>
    </section>
  )
}

export default RecipeList