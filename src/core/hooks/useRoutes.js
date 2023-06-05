import { useContext } from 'react'
import { RouterContext } from '../contexts'

const useRoutes = () => {
    const routes = useContext(RouterContext)

    return routes
}

export default useRoutes
