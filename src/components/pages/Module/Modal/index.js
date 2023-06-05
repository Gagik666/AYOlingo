import React, { useState, useCallback, useEffect, useMemo } from 'react'
import {
    Modal as ChakraModal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton,
    Button,
    Switch,
    FormLabel,
    Input,
    FormControl,
    FormHelperText,
    Select,
    useToast,
    SimpleGrid,
} from '@chakra-ui/react'
import { useCreateModule, useUpdateModule, useCreateExercise, useExercisesByModule, useLanguageGroups, useModulesByOrder, useUpdateExercise } from '../../../../core/hooks'
import { SingleFile } from '../../../theme'
import { DIFFICULTY, GENDER } from '../../../../core/constants'

const EMPTY_STATE = {
    name: '',
    difficulty: '',
    duration: '',
    image: '',
    speakerGender: 'male',
    regression: {
        start: null,
        lastPoint: null,
        step: null,
    },
    published: false
}

export default function Modal ({
    isOpen,
    onClose,
    data: existingData,
    onChange = () => {}
}) {
    const toast = useToast()
    const { modulesByOrder, isLoading: modulesByOrderLoading } = useModulesByOrder()
    const { exercisesByModule, data: exerciseByModuleResponse, isLoading: exerciseByModuleLoading } = useExercisesByModule()
    const { createModule, isLoading: isCreateLoading } = useCreateModule()
    const { updateModule, isLoading: isUpdateLoading } = useUpdateModule()
    const { activeLanguageGroupId, languageGroups } = useLanguageGroups()
    const { createExercise } = useCreateExercise()
    const { updateExercise } = useUpdateExercise()
    const [processing, setProcessing] = useState(false)
    const [errors, setErrors] = useState(EMPTY_STATE)
    const [data, setData] = useState()

    const exercise = useMemo(
        () => {
            if (!exerciseByModuleResponse?.data?.exercisesByModule?.items[0]) {
                return null
            }
            return exerciseByModuleResponse.data.exercisesByModule.items[0]
        },
        [exerciseByModuleResponse]
    )

    const onSubmit = useCallback(
        () => {
            if (data.id) {
                return updateModule(
                    data,
                    {
                        onSuccess: () => {
                            updateExercise({
                                id: exercise.id,
                                published: data.published,
                                _languageGroup: data._languageGroup,
                            })
                            onChange()
                        },
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
            data._languageGroup = activeLanguageGroupId
            data.createdAt = new Date().toISOString()
            data.type = 'Module'
            modulesByOrder(
                {
                    type: 'Module',
                    sortDirection: 'DESC',
                    limit: 1,
                },
                {
                    onSuccess: (modulesByOrderResponse) => {
                        const response = modulesByOrderResponse.data.modulesByOrder.items[0]
                        if (response) data.order = 0
                        createModule(
                            data,
                            {
                                onSuccess: (response) => {
                                    createExercise({
                                        module: response.data.createModule.id,
                                        _languageGroup: activeLanguageGroupId,
                                        published: data.published,
                                    })
                                    onChange()
                                    modulesByOrder(
                                        {
                                            type: 'Module',
                                            sortDirection: 'DESC',
                                            limit: 1,
                                        }
                                    )
                                },
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
                }
            )
        },
        [data, setErrors, setData, activeLanguageGroupId, exercise]
    )

    useEffect(() => {
        if (!errors.name && !errors.duration && !errors.difficulty && !errors.image) return
        setErrors(EMPTY_STATE)
    }, [data])

    useEffect(() => {
        if (existingData) {
            return setData({...existingData})
        }
        setData({
            ...EMPTY_STATE,
            difficulty: DIFFICULTY[0],
        })
    }, [existingData])

    useEffect(() => {
        if (!data?.id) return
        if (exercise) return
        exercisesByModule({module: data.id})
    }, [data, exercise])

    if (!data) return <></>

    return (
        <ChakraModal
            size="xl"
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>{data.id ? 'Update' : 'Create'} Module</ModalHeader>
                <ModalCloseButton _focus={{boxShadow: 'none'}}/>
                <ModalBody>
                    <SingleFile
                        oKey="image"
                        data={data}
                        errors={errors}
                        onChange={file => setData(data => ({...data, ...file}))}
                        setProcessing={setProcessing} />
                    <SimpleGrid
                        columns={2}
                        gap={5}>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={e => setData(data => ({...data, name: e.target.value}))} />
                            {errors.name && (
                                <FormHelperText color="red.100">{errors.name}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="duration">
                            <FormLabel>Duration</FormLabel>
                            <Input
                                type="number"
                                value={data.duration}
                                onChange={e => setData(data => ({...data, duration: e.target.value}))} />
                            {errors.duration && (
                                <FormHelperText color="red.100">{errors.duration}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="difficulty">
                            <FormLabel>Difficulty</FormLabel>
                            <Select
                                value={data.difficulty}
                                textTransform="capitalize"
                                onChange={e => setData(data => ({...data, difficulty: e.target.value}))}>
                                {DIFFICULTY.map(
                                    (difficulty) => (
                                        <option
                                            key={difficulty}
                                            value={difficulty}>
                                            {difficulty}
                                        </option>
                                    )
                                )}
                            </Select>
                            {errors.difficulty && (
                                <FormHelperText color="red.100">{errors.difficulty}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="speaker-gender">
                            <FormLabel>Speaker gender</FormLabel>
                            <Select
                                value={data.speakerGender}
                                textTransform="capitalize"
                                onChange={e => setData(data => ({...data, speakerGender: e.target.value}))}>
                                {GENDER.map(
                                    (gender) => (
                                        <option
                                            key={gender}
                                            value={gender}>
                                            {gender}
                                        </option>
                                    )
                                )}
                            </Select>
                        </FormControl>
                        {data.id && (
                            <FormControl id="language-group-id">
                                <FormLabel>Language Group</FormLabel>
                                <Select
                                    textTransform="capitalize"
                                    value={data._languageGroup}
                                    onChange={e => setData(data => ({...data, _languageGroup: e.target.value}))}>
                                    {languageGroups?.items.map(
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
                        )}
                        <FormControl id="regression-start">
                            <FormLabel>Regression start from the week</FormLabel>
                            <Input
                                type="number"
                                value={data.regression.start}
                                onChange={e => setData(data => ({...data, regression: {...data.regression, start: e.target.value}}))} />
                            {errors.regression?.start && (
                                <FormHelperText color="red.100">{errors.regression.start}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="regression-last-point">
                            <FormLabel>Regression last point</FormLabel>
                            <Input
                                type="number"
                                value={data.regression.lastPoint}
                                onChange={e => setData(data => ({...data, regression: {...data.regression, lastPoint: e.target.value}}))} />
                            {errors.regression?.lastPoint && (
                                <FormHelperText color="red.100">{errors.regression.lastPoint}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="regression-step">
                            <FormLabel>Regression step per week</FormLabel>
                            <Input
                                type="number"
                                value={data.regression.step}
                                onChange={e => setData(data => ({...data, regression: {...data.regression, step: e.target.value}}))} />
                            {errors.regression?.step && (
                                <FormHelperText color="red.100">{errors.regression.step}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="published">
                                Publish
                            </FormLabel>
                            <Switch
                                id="published"
                                isChecked={data.published}
                                value={data.published}
                                onChange={() => setData(data => ({...data, published: !data.published}))} />
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
                        isDisabled={isCreateLoading || isUpdateLoading || exerciseByModuleLoading || processing || modulesByOrderLoading}
                        isLoading={isCreateLoading || isUpdateLoading || exerciseByModuleLoading || processing || modulesByOrderLoading}
                        loadingText={processing ? 'Processing' : ''}
                        onClick={onSubmit}>
                        {data.id ? 'Update' : 'Create'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    )
}
