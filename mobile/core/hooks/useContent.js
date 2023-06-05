import { useContext } from 'react'
import { ContentContext } from '../contexts'

const useContent = () => {
    const content = useContext(ContentContext)

    return content
}

export default useContent
