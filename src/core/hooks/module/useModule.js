import { useContext } from 'react'
import { ModuleContext } from '../../contexts'

export default function useModule () {
    const module = useContext(ModuleContext)
    return module
}