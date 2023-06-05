import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { BsSearch } from "react-icons/bs";
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  useColorModeValue as mode,
  ButtonGroup,
  useToast,
  Stack,
  HStack,
  InputGroup,
  FormLabel,
  FormControl,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import {
  useSearchVocabularies,
  useLanguageGroups,
  useListAlphabets,
  useDeleteVocabulary,
} from "../../../core/hooks";
import Modal from "./Modal";
import AudioButton from "../../theme/Upload/Single/AudioButton";
import { TablePagination } from "../../theme";
import { S3_BUCKET } from "../../../core/constants";

export default function Vocabulary() {
  const toast = useToast();
  const inThrottle = useRef(false);
  const {
    searchVocabularies,
    data: vocabulariesResponse,
    isLoading,
  } = useSearchVocabularies();
  const { listAlphabets, data: alphabetsResponse } = useListAlphabets();
  const { activeLanguageGroupId, activeLanguageGroup } = useLanguageGroups();
  const { deleteVocabulary } = useDeleteVocabulary();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState();
  const [vocabularies, setVocabularies] = useState();
  const [filters, setFilters] = useState({
    page: 1,
    data: {
      limit: 10,
    },
  });

  const onPerPageChange = (value) =>
    setFilters((filters) => ({
      ...filters,
      data: {
        ...filters.data,
        limit: value,
      },
    }));

  const onSort = (field, direction) =>
    setFilters((filters) => ({
      ...filters,
      data: {
        ...filters.data,
        sort: {
          direction,
          field,
        },
      },
    }));

  const onPageChange = (nextToken, page) =>
    setFilters((filters) => {
      const newFilters = { ...filters };
      if (nextToken) {
        newFilters.page += page;
        newFilters.data.nextToken = nextToken;
      } else {
        newFilters.page = 1;
        delete newFilters.data.nextToken;
      }

      return newFilters;
    });

  const alphabet = useMemo(() => {
    if (!alphabetsResponse?.data?.listAlphabets?.items) return;
    return alphabetsResponse.data.listAlphabets.items[0];
  }, [alphabetsResponse]);

  const loadAlphabets = useCallback(() => {
    listAlphabets({
      filter: {
        languageGroup: { eq: activeLanguageGroupId },
      },
    });
  }, [activeLanguageGroupId]);

  const loadVocabularies = useCallback(
    (nextToken) => {
      const variables = {
        limit: 20,
        filter: {
          _languageGroup: { eq: activeLanguageGroupId },
        },
      };
      if (nextToken) variables.nextToken = nextToken;
      searchVocabularies(variables);
    },
    [activeLanguageGroupId]
  );

  const onChange = useCallback(() => {
    onClose();
    loadVocabularies();
  }, [activeLanguageGroupId]);

  const onSearch = useCallback(
    (e) => {
      const { value } = e.target;
      const filter = {
        _languageGroup: { eq: activeLanguageGroupId },
        or: [
          { valueFrom: { matchPhrasePrefix: value } },
          { valueTo: { matchPhrasePrefix: value } },
          { transliterationFrom: { matchPhrasePrefix: value } },
          { transliterationTo: { matchPhrasePrefix: value } },
        ],
      };
      if (!value) delete filter.or;
      if (!inThrottle.current) {
        searchVocabularies({ filter });
        inThrottle.current = true;
        setTimeout(() => (inThrottle.current = false), 300);
      }
    },
    [activeLanguageGroupId, inThrottle]
  );

  const onDelete = (id) => {
    const input = { id };
    deleteVocabulary(input, {
      onSuccess: () => loadVocabularies(),
      onError: (e) =>
        toast({
          title: e.message,
          status: "error",
          isClosable: true,
        }),
    });
  };

  const onEdit = (row) => {
    setData(row);
    onOpen();
  };

  useEffect(() => {
    if (!activeLanguageGroupId) return;
    const vocabFilters = { ...filters.data };
    vocabFilters.filter = { _languageGroup: { eq: activeLanguageGroupId } };
    searchVocabularies(vocabFilters, {
      onSuccess: (response) =>
        setVocabularies(response.data.searchVocabularies),
    });
    loadAlphabets();
  }, [activeLanguageGroupId, filters]);

  return (
    <Box as="section" py="12">
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Box overflowX="scroll">
          <Heading size="lg" mb="6">
            Vocabulary
          </Heading>
        </Box>
        <Stack
          spacing="4"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
        >
          <HStack>
            <FormControl minW={{ md: "320px" }} id="search">
              <InputGroup size="sm">
                <FormLabel srOnly>
                  Filter by value from, value to, transliteration from or
                  transliteration to
                </FormLabel>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  <BsSearch />
                </InputLeftElement>
                <Input
                  rounded="base"
                  type="search"
                  placeholder="Filter by value from, value to, transliteration from or transliteration to..."
                  onChange={onSearch}
                />
              </InputGroup>
            </FormControl>
          </HStack>
          <Button size="sm" onClick={onOpen} isLoading={isLoading}>
            Create
          </Button>
        </Stack>
        <Table my="5" borderWidth="1px" display="block" overflowX="scroll">
          <Thead bg={mode("gray.50", "gray.800")}>
            <Tr>
              <Th whiteSpace="nowrap" scope="col">
                {activeLanguageGroup.from} value
              </Th>
              <Th whiteSpace="nowrap" scope="col">
                {activeLanguageGroup.from} transliteration
              </Th>
              <Th whiteSpace="nowrap" scope="col">
                {activeLanguageGroup.from} audio
              </Th>
              <Th whiteSpace="nowrap" scope="col">
                {activeLanguageGroup.from} alphabet letter
              </Th>
              <Th whiteSpace="nowrap" scope="col">
                {activeLanguageGroup.to} value
              </Th>
              <Th whiteSpace="nowrap" scope="col">
                {activeLanguageGroup.to} transliteration
              </Th>
              <Th whiteSpace="nowrap" scope="col">
                {activeLanguageGroup.to} audio
              </Th>
              <Th whiteSpace="nowrap" scope="col">
                {activeLanguageGroup.to} alphabet letter
              </Th>
              <Th whiteSpace="nowrap" scope="col">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {vocabularies?.items.map((vocabulary) => (
              <Tr key={`vocabulary-${vocabulary.id}`}>
                <Td>{vocabulary.valueFrom}</Td>
                <Td>{vocabulary.transliterationFrom}</Td>
                <Td>
                  {vocabulary.audioFrom && (
                    <AudioButton file={vocabulary.audioFrom} />
                  )}
                </Td>
                <Td>{vocabulary.alphabetLetterFrom}</Td>
                <Td>{vocabulary.valueTo}</Td>
                <Td>{vocabulary.transliterationTo}</Td>
                <Td>
                  {vocabulary.audioTo && (
                    <AudioButton file={vocabulary.audioTo} />
                  )}
                </Td>
                <Td>{vocabulary.alphabetLetterTo}</Td>
                <Td>
                  <ButtonGroup>
                    <Button
                      variant="link"
                      colorScheme="blue"
                      size="sm"
                      onClick={() => onEdit(vocabulary)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      colorScheme="red"
                      size="sm"
                      onClick={() => onDelete(vocabulary.id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <TablePagination
          data={vocabularies}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      </Box>
      <Modal
        alphabet={alphabet}
        data={data}
        activeLanguageGroup={activeLanguageGroup}
        isOpen={isOpen}
        onClose={onClose}
        onChange={onChange}
      />
    </Box>
  );
}
