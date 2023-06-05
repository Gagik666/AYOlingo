import React, { useState, useCallback, useEffect } from 'react'
import {
    Modal as ChakraModal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton,
    Button,
    Stack,
    FormLabel,
    SimpleGrid,
    Input,
    FormControl,
    FormHelperText,
    Select,
    useToast,
} from '@chakra-ui/react'
import { useCreateVocabulary, useUpdateVocabulary } from '../../../../core/hooks'
import { EMPTY_VOCABULARY } from '../../../../core/constants'
import { SingleFile } from '../../../theme'

export default function Modal ({
    isOpen,
    onClose,
    alphabet,
    activeLanguageGroup,
    onChange,
    data: existingData
}) {
    const toast = useToast()
    const [data, setData] = useState()
    const [errors, setErrors] = useState(EMPTY_VOCABULARY)
    const [processing, setProcessing] = useState({'0': false, '1': false})
    const {createVocabulary, isLoading: isCreateLoading} = useCreateVocabulary()
    const {updateVocabulary, isLoading: isUpdateLoading} = useUpdateVocabulary()

    const onSubmit = useCallback(
        () => {
            if (data.id) {
                delete data.createdAt
                delete data.updatedAt
                return updateVocabulary(
                    data,
                    {
                        onSuccess: () => onChange(),
                        onError: (e) => {
                            let message = e.message
                            const failedValidations = JSON.parse(e.message)
                            if (failedValidations) {
                                return setErrors(failedValidations)
                            }
                            toast({
                                title: message,
                                status: 'error',
                                isClosable: true,
                            })
                        },
                    },
                )
            }
            data._languageGroup = activeLanguageGroup.id
            createVocabulary(
                data,
                {
                    onSuccess: () => onChange(),
                    onError: (e) => {
                        let message = e.message
                        const failedValidations = JSON.parse(e.message)
                        if (failedValidations) {
                            return setErrors(failedValidations)
                        }
                        toast({
                            title: message,
                            status: 'error',
                            isClosable: true,
                        })
                    },
                },
            )
        },
        [data]
    )

    useEffect(() => {
        if (!errors.valueFrom && !errors.valueTo && !errors.transliterationFrom && !errors.transliterationTo) return
        setErrors(EMPTY_VOCABULARY)
    }, [data])

    useEffect(() => {
        if (existingData) {
            return setData({...existingData})
        }
        setData({
            ...EMPTY_VOCABULARY,
            alphabetLetterFrom: alphabet?.languageFrom?.letters[0]?.uppercase,
            alphabetLetterTo: alphabet?.languageTo?.letters[0]?.uppercase,
        })
    }, [existingData, alphabet, isOpen])

    if (!data) return <></>

    return (
        <ChakraModal
            size="2xl"
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>{data.id ? 'Update' : 'Create'} Vocabulary</ModalHeader>
                <ModalCloseButton _focus={{boxShadow: 'none'}}/>
                <ModalBody>
                    <SimpleGrid columns={2} spacing={15}>
                        <FormControl id="value-from">
                            <FormLabel textTransform="capitalize">{activeLanguageGroup.from} Value</FormLabel>
                            <Input
                                value={data.valueFrom}
                                onChange={e => setData(data => ({...data, valueFrom: e.target.value}))} />
                            {errors.valueFrom && (
                                <FormHelperText color="red.100">{errors.valueFrom}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="value-to">
                            <FormLabel textTransform="capitalize">{activeLanguageGroup.to} Value</FormLabel>
                            <Input
                                value={data.valueTo}
                                onChange={e => setData(data => ({...data, valueTo: e.target.value}))} />
                            {errors.valueTo && (
                                <FormHelperText color="red.100">{errors.valueTo}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="transliteration-from">
                            <FormLabel textTransform="capitalize">{activeLanguageGroup.from} transliteration</FormLabel>
                            <Input
                                value={data.transliterationFrom}
                                onChange={e => setData(data => ({...data, transliterationFrom: e.target.value}))} />
                            {errors.transliterationFrom && (
                                <FormHelperText color="red.100">{errors.transliterationFrom}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="transliteration-to">
                            <FormLabel textTransform="capitalize">{activeLanguageGroup.to} transliteration</FormLabel>
                            <Input
                                value={data.transliterationTo}
                                onChange={e => setData(data => ({...data, transliterationTo: e.target.value}))} />
                            {errors.transliterationTo && (
                                <FormHelperText color="red.100">{errors.transliterationTo}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel textTransform="capitalize">{activeLanguageGroup.from} audio</FormLabel>
                            <SingleFile
                                id="vocabulary-language-from"
                                type="audio"
                                oKey="audioFrom"
                                data={data}
                                onChange={data => setData(oldData => ({...oldData, audioFrom: data['audioFrom']}))}
                                processing={processing['0']}
                                setProcessing={value => setProcessing(processing => ({...processing, '0': value}))} />
                            {errors.audioFrom && (
                                <FormHelperText color="red.100">{errors.audioFrom}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel textTransform="capitalize">{activeLanguageGroup.to} audio</FormLabel>
                            <SingleFile
                                id="vocabulary-language-to"
                                type="audio"
                                oKey="audioTo"
                                data={data}
                                onChange={data => setData(oldData => ({...oldData, audioTo: data['audioTo']}))}
                                processing={processing['1']}
                                setProcessing={value => setProcessing(processing => ({...processing, '1': value}))} />
                            {errors.audioTo && (
                                <FormHelperText color="red.100">{errors.audioTo}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="alphabet-letter-from">
                            <FormLabel textTransform="capitalize">{activeLanguageGroup.from} alphabet letter from</FormLabel>
                            <Select
                                value={data.alphabetIndexFrom}
                                onChange={e => setData(data => ({...data, alphabetLetterFrom: alphabet.letters[e.target.value].fromUppercase, alphabetIndexFrom: e.target.value}))}>
                                {alphabet?.letters?.map(
                                    (letter, index) => (
                                        <option
                                            key={`vocabulary-language-from-${letter.fromUppercase}-${index}`}
                                            value={index}>
                                            {letter.fromUppercase}
                                        </option>
                                    )
                                )}
                            </Select>
                            {(errors.alphabetLetterFrom) && (
                                <FormHelperText color="red.100">{errors.alphabetLetterFrom}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="alphabet-letter-to">
                            <FormLabel textTransform="capitalize">{activeLanguageGroup.to} alphabet letter to</FormLabel>
                            <Select
                                value={data.alphabetIndexTo}
                                onChange={e => setData(data => ({...data, alphabetLetterTo: alphabet.letters[e.target.value].toUppercase, alphabetIndexTo: e.target.value}))}>
                                {alphabet?.letters?.map(
                                    (letter, index) => (
                                        <option
                                            key={`vocabulary-language-to-${letter.toUppercase}-${index}`}
                                            value={index}>
                                            {letter.toUppercase}
                                        </option>
                                    )
                                )}
                            </Select>
                            {(errors.alphabetLetterTo) && (
                                <FormHelperText color="red.100">{errors.alphabetLetterTo}</FormHelperText>
                            )}
                        </FormControl>
                    </SimpleGrid>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="ghost"
                        mr={3}
                        onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant="ghost"
                        colorScheme="blue"
                        isLoading={isCreateLoading || isUpdateLoading || processing['0'] || processing['1']}
                        isDisabled={isCreateLoading || isUpdateLoading || processing['0'] || processing['1']}
                        loadingText={processing ? 'Processing' : ''}
                        onClick={onSubmit}>
                        {data.id ? 'Update' : 'Create'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    )
}