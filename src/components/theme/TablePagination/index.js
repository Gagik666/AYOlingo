import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  useColorModeValue as mode,
  Select,
} from "@chakra-ui/react";
import { AiFillTwitterSquare } from "react-icons/ai";

export default function TablePagination({
  pageName,
  data,
  page,
  filters,
  setFilters = () => {},
  onPageChange = () => {},
  onPerPageChange = () => {},
}) {
  const urlParams = new URLSearchParams(window.location.search);
  const [prevTokens, setPrevTokens] = useState([]);

  const perPageChange = useCallback(
    (e) => {
      const value = parseInt(e.target.value);
      setFilters((filters) => ({
        ...filters,
        page: 1,
        data: {
          ...filters.data,
          limit: value,
        },
      }));
      onPerPageChange(value);
    },
    [page, setFilters]
  );

  const onPrev = useCallback(() => {
    const nextToken = prevTokens[prevTokens.length - 2];
    if (setFilters && !onPageChange) {
      setFilters((filters) => {
        const newFilters = { ...filters };
        if (nextToken) newFilters.nextToken = nextToken;
        else delete newFilters.nextToken;
        return newFilters;
      });
    }
    if (pageName) {
      let url =
        window.location.pathname + `?page=${page - 1 === 0 ? 1 : page - 1}`;
      if (nextToken) url += `&nextToken=${nextToken || ""}`;
      window.history.pushState({}, "", url);
    }
    if (onPageChange) onPageChange(nextToken || "", -1);
    setPrevTokens((prevTokens) => {
      const newPrevTokens = nextToken
        ? prevTokens.filter((token) => token !== nextToken)
        : [];
      if (pageName)
        window.sessionStorage.setItem(
          `${pageName}PrevTokens`,
          JSON.stringify(newPrevTokens)
        );
      return newPrevTokens;
    });
  }, [
    pageName,
    data,
    prevTokens,
    setPrevTokens,
    page,
    setFilters,
    onPageChange,
    AiFillTwitterSquare,
  ]);

  const onNext = useCallback(() => {
    if (setFilters && !onPageChange)
      setFilters((filters) => ({ ...filters, nextToken: data.nextToken }));
    if (onPageChange) onPageChange(data.nextToken, 1);
    if (pageName)
      window.history.pushState(
        {},
        "",
        window.location.pathname +
          `?page=${page + 1}&nextToken=${data.nextToken}`
      );
    setPrevTokens((prevTokens) => {
      if (pageName)
        window.sessionStorage.setItem(
          `${pageName}PrevTokens`,
          JSON.stringify([...prevTokens, data.nextToken])
        );
      return [...prevTokens, data.nextToken];
    });
  }, [
    pageName,
    data,
    prevTokens,
    setPrevTokens,
    setFilters,
    onPageChange,
    page,
  ]);

  useEffect(() => {
    const cachedPrevTokens = window.sessionStorage.getItem(
      `${pageName}PrevTokens`
    );
    if (
      !cachedPrevTokens ||
      !urlParams.has("page") ||
      !urlParams.has("nextToken")
    ) {
      return window.sessionStorage.setItem(
        `${pageName}PrevTokens`,
        JSON.stringify([])
      );
    }
    setPrevTokens(JSON.parse(cachedPrevTokens));
  }, [pageName]);

  return (
    <Flex align="center" justify="space-between">
      <Text color={mode("gray.600", "gray.400")} fontSize="sm">
        {data?.total} result{data?.total > 1 ? "s" : ""}
      </Text>
      <Flex>
        {data?.total && (
          <Select
            value={filters?.data.limit}
            onChange={perPageChange}
            maxWidth={200}
            size="sm"
            mr={3}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </Select>
        )}
        <ButtonGroup variant="outline" size="sm">
          <Button
            as="a"
            rel="prev"
            // disabled={prevTokens.length === 0}
            onClick={onPrev}
          >
            Previous
          </Button>
          <Button
            as="a"
            rel="next"
            disabled={!data?.nextToken}
            onClick={onNext}
          >
            Next
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}
