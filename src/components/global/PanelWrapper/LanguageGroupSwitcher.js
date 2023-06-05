import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import {
    HStack,
    FormControl,
    FormLabel,
    Select,
    Link,
    useColorModeValue as mode
} from '@chakra-ui/react'
import { useLanguageGroups } from '../../../core/hooks'

export default function LanguageGroupSwitcher () {
    const { languageGroups, activeLanguageGroupId, setActiveLanguageGroupId } = useLanguageGroups()

    return (
        <HStack spacing="4" px="2">
            {languageGroups?.items?.length > 0 ? (
                <FormControl id="language-group-switcher">
                    <FormLabel>Language Group</FormLabel>
                    <Select
                        textTransform="capitalize"
                        value={activeLanguageGroupId}
                        onChange={e => setActiveLanguageGroupId(e.target.value)}>
                        {languageGroups.items.map(
                            (languageGroup) => (
                                <option
                                    key={languageGroup.id}
                                    value={languageGroup.id}>
                                    {languageGroup.from} - {languageGroup.to}
                                </option>
                            )
                        )}
                    </Select>
                </FormControl>
            ) : (
                <Link
                    as={ReactLink}
                    to="/languages/groups?create=true"
                    color={mode('blackAlpha.800', 'whiteAlpha.800')}>
                    Create language group
                </Link>
            )}
        </HStack>
    )
}
