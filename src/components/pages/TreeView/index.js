import React, { useEffect, useState } from 'react'
import {
    Box,
    Heading,
    Accordion,
    Button,
    useColorModeValue as mode
} from '@chakra-ui/react'
import { useSearchModules, useLanguageGroups } from '../../../core/hooks'

import ModuleAccordion from './ModuleAccordion'

export default function TreeView () {
    const { activeLanguageGroup } = useLanguageGroups()
    const { searchModules, data: modulesResponse, isLoading: isModulesLoading } = useSearchModules()
    const [modules, setModules] = useState()
    const [modulesFilter, setModulesFilter] = useState()

    useEffect(() => {
        if (!activeLanguageGroup?.id) return
        setModulesFilter({
            limit: 10,
            from: 0,
            filter: {
                _languageGroup: {eq: activeLanguageGroup.id}
            },
            sort: {
                direction: 'asc',
                field: 'order'
            }
        })
    }, [activeLanguageGroup])

    useEffect(() => {
        if (!modulesFilter) return
        searchModules(modulesFilter)
    }, [modulesFilter])

    useEffect(() => {
        if (!modulesResponse) return
        setModules(
            (oldModules) => {
                const newModules = oldModules ? {...oldModules} : {items: [], nextToken: ''}
                newModules.nextToken = modulesResponse.data.searchModules.nextToken
                newModules.items = [...newModules.items, ...modulesResponse.data.searchModules.items]
                return newModules
            }
        )
    }, [modulesResponse])

    return (
        <Box as="section" py="12">
            <Box
                maxW={{ base: 'xl', md: '7xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}>
                <Box overflowX="auto">
                    <Heading size="lg" mb="6">
                        Tree View
                    </Heading>
                </Box>
                {modules && (
                    <Accordion
                        allowMultiple={true}
                        allowToggle={true}>
                        {modules.items.map(
                            (module, index) => (
                                <ModuleAccordion
                                    key={`module-${module.id}-${index}`}
                                    module={module} />
                            )
                        )}
                    </Accordion>
                )}
                {modules?.nextToken && (
                    <Button
                        mt={3}
                        size="md"
                        isLoading={isModulesLoading}
                        onClick={() => setModulesFilter(filters => ({...filters, from: filters.from + filters.limit}))}>
                        Load More
                    </Button>
                )}
            </Box>
        </Box>
    )
}
