import { useEffect, useState } from "react";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import { S3_BUCKET } from "../constants";

export default function useCacheAudios(audiosArr, enabled = true) {
  const [audios, setAudios] = useState({});

  const clearCache = async () => {
    try {
      console.log("clear cached audios", audios);
      await Promise.all(
        Object.values(cacheAudios).map((path) => RNFS.unlink(path))
      );
      console.log("cache cleared successfully");
    } catch (e) {
      console.log("error clearing cache", e);
    }
  };

  const cacheAudios = async (lazyAudiosArr) => {
    const data = lazyAudiosArr || audiosArr;

    const result = {};
    const RNFConfig = {
      appendExt: "mp3",
      fileCache: true,
    };

    data.forEach(async (row) => {
      const fileName = row.replace("mpeg", "mp3").replace("wav", "mp3");
      const audio = encodeURI(S3_BUCKET + "_audio/" + fileName);
      console.log(`caching audio: ${audio}`);
      try {
        const response = await RNFetchBlob.config(RNFConfig).fetch(
          "GET",
          audio
        );
        const path = await response.path();
        result[row] = path;
      } catch (e) {
        console.log(`error caching audio: ${audio}, error: ${e}`);
      }
    });

    setAudios(result);
    return result;
  };

  useEffect(() => {
    console.log("caching audios");
    if (enabled) {
      cacheAudios();
    }

    return () => {
      clearCache();
    };
  }, []);

  return { audios, cacheAudios };
}
