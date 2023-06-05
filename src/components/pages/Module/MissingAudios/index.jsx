import { useEffect, useMemo, useState } from 'react'
import CsvDownloader from 'react-csv-downloader'
import { useParams, Link as ReactLink } from 'react-router-dom'
import {
    Box,
    Flex,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Link,
    Button,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { useExercisesByModule, useGetModule } from '../../../../core/hooks'
import getMissingAudios from './getMissingAudios'

const EXPORT_CSV_COLUMNS = [
    {
      id: 'module',
      displayName: 'Module name',
    },
    {
      id: 'lessonIndex',
      displayName: 'Lesson Index',
    },
    {
      id: 'exerciseIndex',
      displayName: 'Exercise Index',
    },
    {
      id: 'quizIndex',
      displayName: 'Quiz Index',
    },
    {
      id: 'AnswerIndex',
      displayName: 'Answer Index',
    },
    {
      id: 'text',
      displayName: 'Text',
    },
]

export default function MissingAudios() {
    const { moduleId } = useParams()
    const { getModule, data: moduleResponse } = useGetModule()
    const { exercisesByModule, data: exerciseResponse } = useExercisesByModule()
    const [missingAudios, setMissingAudios] = useState([])
    const [csvData, setCsvData] = useState(null)

    const exercise = useMemo(() => {
        if (!exerciseResponse?.data?.exercisesByModule) return
        return exerciseResponse.data.exercisesByModule.items[0]
    }, [exerciseResponse])

    const module = useMemo(() => {
        if (!moduleResponse?.data?.getModule) return
        return moduleResponse.data.getModule
    }, [moduleResponse])

    useEffect(() => {
        getModule(moduleId)
        exercisesByModule({ module: moduleId })
    }, [moduleId])

    useEffect(() => {
        ;(async () => {
            if (exercise) {
                const missingAudios = await getMissingAudios(exercise)
                setMissingAudios(missingAudios)
            }
        })()
    }, [exercise])

    useEffect(() => {
        if (missingAudios?.length > 0) {
            const mapMissingAudio = (missingAudio) => {
                return {
                    module: module.name,
                    lessonIndex: missingAudio.lessonIndex,
                    exerciseIndex: missingAudio.exerciseIndex,
                    quizIndex: missingAudio.quizIndex,
                    AnswerIndex: missingAudio.answerIndex,
                    text: missingAudio.text,
                }
            }
            setCsvData(missingAudios.map(mapMissingAudio))
        }
    }, [missingAudios])

    if (!module || !exercise) {
        return null
    }

    return (
        <Box as="section" py="12">
            <Box
                maxW={{ base: 'xl', md: '7xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb="6">
                    <Heading size="lg">
                        Missing Audios - {module.name}
                    </Heading>
                    {csvData && (
                        <CsvDownloader
                            columns={EXPORT_CSV_COLUMNS}
                            datas={csvData}
                            filename={`${module?.name}-missing-audios`}>
                            <Button>
                                Export
                            </Button>
                        </CsvDownloader>
                    )}
                </Flex>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            as={ReactLink}
                            to="/collection/modules/list">
                            Modules
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            {module.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink>Missing audios</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Box
                    w="100%"
                    my="8"
                    overflowX="auto">
                    <Table
                        borderWidth="1px"
                        fontSize="sm">
                        <Thead bg={mode('gray.50', 'gray.800')}>
                            <Tr>
                                <Th whiteSpace="nowrap" scope="col">
                                    #
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    Text
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    Lesson
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    Exercise
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    Quiz
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {missingAudios.map((missingAudio, index) => (
                                <Tr key={`missing-audio-${missingAudio.lessonIndex}-${missingAudio.exerciseIndex}-${missingAudio.answerIndex}-${missingAudio.text}`}>
                                    <Td whiteSpace="nowrap" scope="col">
                                        {index + 1}
                                    </Td>
                                    <Td whiteSpace="nowrap" scope="col">
                                        <Link
                                            as={ReactLink}
                                            to={`/collection/modules/list/${module.id}/lesson/${missingAudio.lessonIndex}/edit-exercise/${missingAudio.exerciseIndex}`}
                                            textDecoration="underline !important">
                                            {missingAudio.text}
                                        </Link>
                                    </Td>
                                    <Td whiteSpace="nowrap" scope="col">
                                        {missingAudio.lessonIndex + 1}
                                    </Td>
                                    <Td whiteSpace="nowrap" scope="col">
                                        {missingAudio.exerciseIndex + 1}
                                    </Td>
                                    <Td whiteSpace="nowrap" scope="col">
                                        {missingAudio.quizIndex + 1}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Box>
    )
}
