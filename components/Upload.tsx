import { ChangeEvent, useRef, ReactNode, useCallback } from 'react';

type Props = {
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
  children?: ReactNode;
};

const Upload = ({ children, onError, onSuccess }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(
    () => inputRef.current?.click(),
    [inputRef.current]
  );

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length) {
        const formData = new FormData();
        formData.append('fileToUpload', files[0]);

        fetch('https://nostr.build/api/upload/iris.php', {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((url) => {
            if (!!url) {
              onSuccess?.(url);
            } else {
              onError?.('upload failed');
            }
          })
          .catch((error) => {
            console.error('upload error', error);
            onError?.('upload failed: ' + JSON.stringify(error));
          });
      }
    },
    [onSuccess, onError]
  );

  return (
    <div className="inline-block" onClick={handleClick}>
      {children ?? <div className="btn btn-primary btn-sm">Upload</div>}
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept=".jpg, .png"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default Upload;
