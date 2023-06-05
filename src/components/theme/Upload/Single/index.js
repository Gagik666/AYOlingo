import React, { useCallback, useState } from "react";
import {
  FormControl,
  Button,
  ButtonGroup,
  Flex,
  FormLabel,
  FormHelperText,
  Img,
  Spinner,
  useToast,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import {
  useUploadSingleFile,
  useCreateAudio,
  useUpdateAudio,
} from "../../../../core/hooks";
import { S3_BUCKET } from "../../../../core/constants";
import UploadButton from "./UploadButton";
import AudioButton from "./AudioButton";

export default function Single({
  type = "image",
  id,
  errors = {},
  oKey,
  processing,
  data = {},
  gender = "male",
  imageMaxHeight = "150px",
  onChange = () => {},
  setProcessing = () => {},
}) {
  const toast = useToast();
  const [audioChanged, toggleAudioChanged] = useState(false);
  const [replace, toggleReplace] = useState(false);
  const { upload, isLoading } = useUploadSingleFile();
  const { createAudio } = useCreateAudio();
  const { updateAudio } = useUpdateAudio();

  const onAudioChange = () => {
    toggleAudioChanged(true);

    setTimeout(() => {
      toggleAudioChanged(false);
    }, 300);
  };

  const onFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file) return;
      let fileName = file.name.split(".");
      fileName.pop();
      fileName = fileName.join(".");
      let fileType = file.type.split("/")[1] || "jpeg";
      if (fileType === "mpeg") {
        fileType = "mp3";
      }
      let name = `${new Date().getTime() * Math.random()}.${fileType}`;
      if (type === "audio") {
        name = file.name;
      }
      if (data.audio && replace) {
        name = data.audio;
      }
      if (type === "audio") {
        name = `_audio/${name}`;
      }

      setProcessing(true);
      upload(
        {
          name,
          file,
          type: fileType,
          existing:
            data.audio && replace ? `public/_audio/${data.audio}` : null,
        },
        {
          onSuccess: (response) => {
            if (type === "audio") {
              const audioInput = {
                id: fileName,
                file: response.replace("_audio/", ""),
                gender,
                type,
              };
              updateAudio(audioInput, {
                onSuccess: (response) => {
                  onAudioChange();
                },
                onError: (error) => {
                  console.log(error, " audio does not exist");
                  createAudio(audioInput, {
                    onSuccess: (response) => {
                      onAudioChange();
                    },
                    onError: (error) =>
                      console.log(error, " audio create error"),
                  });
                },
              });
            }
            onChange({ [oKey]: response.replace("_audio/", "") });
            setProcessing(false);
          },
          onError: (e) => {
            toast({
              title: e.message,
              status: "error",
              isClosable: true,
            });
            setProcessing(false);
          },
        }
      );
    },
    [processing, setProcessing, onChange, replace]
  );

  return (
    <>
      <FormControl id="image">
        <Flex as={FormLabel} flexDirection="column">
          {type === "image" ? (
            <>
              <Flex mb="2" alignItems="center">
                Image
                {isLoading && <Spinner ml="2" w="3" h="3" />}
              </Flex>
              {data[oKey] && (
                <Img
                  src={S3_BUCKET + data[oKey]}
                  alt={`${oKey} image`}
                  borderRadius="md"
                  maxHeight={imageMaxHeight}
                  cursor="pointer"
                  objectFit="cover"
                />
              )}
              <UploadButton
                type={type}
                id={id}
                type={type}
                onFileChange={onFileChange}
              />
            </>
          ) : (
            <ButtonGroup size="sm" isAttached variant="outline">
              {type === "audio" && data[oKey] && (
                <AudioButton audioChanged={audioChanged} file={data[oKey]} />
              )}
              {data[oKey] && (
                <Button type="button" mr="-px" colorScheme="blackAlpha" px="0">
                  <Link
                    target="_blank"
                    href={
                      S3_BUCKET + "_audio/" + data[oKey].replace("mpeg", "mp3")
                    }
                    px="3"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {data[oKey]}
                  </Link>
                </Button>
              )}
              <UploadButton
                type={type}
                showIcon={data[oKey] ? true : false}
                isLoading={processing}
                id={id}
                onFileChange={onFileChange}
              />
            </ButtonGroup>
          )}
        </Flex>
        {errors.image && (
          <FormHelperText color="red.100">{errors.image}</FormHelperText>
        )}
      </FormControl>
      {type !== "image" && (
        <FormControl display="flex">
          <FormLabel htmlFor="replace" mb={0}>
            Replace audio
          </FormLabel>
          <Checkbox
            id="replace"
            checked={replace}
            onChange={(e) => toggleReplace(e.target.checked)}
          />
        </FormControl>
      )}
    </>
  );
}
