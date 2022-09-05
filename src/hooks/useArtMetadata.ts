import { useMemo } from 'react';

import dateToMilliseconds from '../helpers/dateToMilliseconds';

const useArtMetadata = (metadata: any) => {
  const issuedAt = useMemo(() => {
    if (metadata) {
      return metadata.date || dateToMilliseconds(metadata.issued_at);
    }
  }, [metadata?.date, metadata?.issued_at]);

  const media = useMemo(() => {
    if (metadata && metadata.media.startsWith('http')) {
      return metadata.media;
    }

    return `https://paras-cdn.imgix.net/${metadata?.media}`;
  }, [metadata?.media]);

  const isVideo = useMemo(() => {
    if (metadata) {
      return metadata.mime_type && metadata.mime_type.includes('video');
    }
  }, [metadata?.mime_type]);

  return { issuedAt, media, isVideo };
};

export default useArtMetadata;
