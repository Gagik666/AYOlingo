import { useContext } from 'react'
import { LanguageGroupContext } from '../../contexts'

const useUser = () => (
    useContext(LanguageGroupContext)
)

export default useUser
