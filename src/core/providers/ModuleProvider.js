import React, { useMemo, useState } from 'react'
import { ModuleContext } from '../contexts'
import { useExercisesByModule, useGetModule, useSearchModules } from '../../core/hooks'

export default function Wrapper ({
    children
}) {
    const [modules, setModules] = useState()
    const { getModule, data: moduleResponse } = useGetModule()
    const { searchModules, isLoading: modulesLoading } = useSearchModules()
    const { exercisesByModule, data: exercisesResponse, isLoading: exercisesLoading } = useExercisesByModule()

    const module = useMemo(
        () => {
            if (!moduleResponse?.data?.getModule) return
            return moduleResponse.data.getModule
        },
        [moduleResponse]
    )

    const exercise = useMemo(
        () => {
            if (!exercisesResponse?.data?.exercisesByModule) return
            return exercisesResponse.data.exercisesByModule.items[0]
        },
        [exercisesResponse]
    )

    const loadExercise = (module) => exercisesByModule({module})

    const loadModules = (filters) => {
        const variables = {...filters, type: 'Module'}
        searchModules(variables, {
            onSuccess: (response) => setModules({...response.data.searchModules})
        })
    }

    return (
        <ModuleContext.Provider value={{
            module,
            getModule,
            modules,
            setModules,
            loadModules,
            modulesLoading,
            loadExercise,
            exercisesLoading,
            exercise
        }}>
            {children}
        </ModuleContext.Provider>
    )
}