import { useState, useContext, useEffect, useCallback, createContext } from "react";

const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=`


const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('a')
    const [recipes, setRecipes] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const openSidebar = () => {
        setIsSidebarOpen(true)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    const fetchRecipes = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}${searchTerm}`)
            const data = await response.json()
            const { meals } = data
            if (meals) {
                const newRecipes = meals.map((recipe) => {
                    const {idMeal, strMeal, strCategory, strInstructions, strMealThumb, strTags } = recipe
                    return { id: idMeal, name: strMeal, img: strMealThumb, category: strCategory, overview: strInstructions, tags: strTags }
                })
                setRecipes(newRecipes)
            } else {
                setRecipes([])
            }
            setLoading(false)            
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }, [searchTerm])

    useEffect(() => {
        fetchRecipes()
    }, [searchTerm, fetchRecipes])


    return (
        <AppContext.Provider value={{loading, recipes, setSearchTerm, isSidebarOpen, closeSidebar, openSidebar}}>{children}</AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }