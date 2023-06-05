import React from 'react'
import {
    InputGroup,
    FormControl,
    InputLeftElement,
    InputRightElement,
    Input,
    Button,
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'

export default function HeaderSearch ({
    maxW,
    search,
    setSearch,
    onSearch,
}) {
    return (
        <FormControl minW={{ md: '320px' }} id="search">
            <InputGroup size="sm" maxW={maxW}>
                <InputLeftElement pointerEvents="none" color="gray.400">
                    <BsSearch />
                </InputLeftElement>
                <Input
                    rounded="base"
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="xs" onClick={onSearch}>
                            Search
                        </Button>
                    </InputRightElement>
            </InputGroup>
        </FormControl>
    )
}
