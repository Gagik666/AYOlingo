import React, { useMemo, useRef } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { Input, Button, Spinner } from "@chakra-ui/react";

export default function UploadButton({
  type,
  showIcon,
  isLoading,
  id,
  onFileChange,
}) {
  const image = useRef();

  const inputProps = useMemo(() => {
    const props = {};

    if (type === "audio") {
      props.accept = ".mp3";
    }

    return props;
  }, [type]);

  return (
    <>
      <Button
        size="sm"
        colorScheme="blackAlpha"
        onClick={() => image.current.click()}
      >
        {isLoading ? (
          <Spinner w="3" h="3" />
        ) : (
          <>
            {showIcon ? <AiOutlineUpload color="black" /> : "Click to upload"}
          </>
        )}
      </Button>
      <Input
        ref={image}
        id={id}
        type="file"
        display="none"
        onChange={onFileChange}
        {...inputProps}
      />
    </>
  );
}
