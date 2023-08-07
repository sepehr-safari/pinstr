import {
  CogIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
} from '@heroicons/react/20/solid';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { MenuTemplate, Modal } from '@/components';

import { MenuItem } from './MenuTemplate.types';

interface Props {
  coverPhotoURL: string;
  setCoverPhotoURL: (coverPhotoURL: string) => void;
}

const coverPhotoMenuItems: MenuItem[] = [
  {
    name: 'Upload',
    description: 'Upload your own cover photo directly to nostr.build cloud.',
  },
  {
    name: 'Stock Photos',
    description: 'Select from a library of stock photos provided by Unsplash.',
  },
  {
    name: 'URL',
    description: 'Enter a direct URL to an image on the web.',
  },
];

export default function CoverPhotoMenu({
  coverPhotoURL,
  setCoverPhotoURL,
}: Props) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    coverPhotoMenuItems[0].name
  );
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showModalIndex, setShowModalIndex] = useState<null | number>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleLoadMore = useCallback(() => {
    setIsSearching(true);

    const promises = Array.from({ length: 10 }, (_, index) => {
      return fetch(
        `https://source.unsplash.com/random/?${searchKeyword}&sig=${index}`
      );
    });

    Promise.all(promises).then((responses) => {
      const urls = responses.map((response) => response.url.split('?')[0]);

      setIsSearching(false);
      setSearchResult((prev) => [...prev, ...urls]);
    });
  }, [searchKeyword]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles) {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('fileToUpload', acceptedFiles[0]);

      fetch('https://nostr.build/api/upload/iris.php', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((url) => {
          if (!!url) {
            setIsUploading(false);
            setCoverPhotoURL(url);
          } else {
            console.error('upload error');
          }
        })
        .catch((error) => {
          console.error('upload error', error);
        });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (!searchKeyword) {
      setIsSearching(false);
      setSearchResult([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);

      const promises = Array.from({ length: 10 }, (_, index) => {
        return fetch(
          `https://source.unsplash.com/random/?${searchKeyword}&sig=${index}`
        );
      });

      Promise.all(promises).then((responses) => {
        const urls = responses.map((response) => response.url.split('?')[0]);

        setIsSearching(false);
        setSearchResult(urls);
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  console.log(coverPhotoURL, setCoverPhotoURL);

  return (
    <>
      <MenuTemplate
        items={coverPhotoMenuItems}
        selected={selectedMenuItem}
        setSelected={setSelectedMenuItem}
      />

      {!coverPhotoURL && selectedMenuItem === 'Upload' && (
        <div className="mt-4">
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Cover Photo / Upload
          </span>

          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center" {...getRootProps()}>
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />

              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  {!isUploading && <span>Upload a file</span>}
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    {...getInputProps()}
                  />
                </label>
                {!isUploading && <p className="pl-1">or drag and drop</p>}
              </div>
              {!isDragActive && !isUploading && (
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              )}
              {isUploading && (
                <div className="w-full flex justify-center items-center">
                  <CogIcon className="h-6 w-6 text-gray-500 animate-spin" />
                  <span className="ml-1 text-xs text-gray-500">
                    Uploading...
                  </span>
                </div>
              )}
              {isDragActive && (
                <p className="text-xs leading-5 text-gray-600">Drop here...</p>
              )}
            </div>
          </div>
        </div>
      )}

      {!coverPhotoURL && selectedMenuItem === 'Stock Photos' && (
        <>
          <span className="mt-4 block text-sm font-medium leading-6 text-gray-900">
            Cover Photo / Search From Stock Photos
          </span>

          <div className="mt-2 relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
              type="search"
              name="search"
              id="search"
              placeholder="Search a keyword"
              autoComplete="off"
              autoFocus
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 max-h-80 overflow-y-scroll">
            {searchResult.length > 0 &&
              searchResult.map((url, index) => (
                <>
                  <img
                    key={index}
                    src={url}
                    alt="Cover photo"
                    className="object-cover w-full h-full rounded-md"
                    onClick={() => setShowModalIndex(index)}
                  />
                  <Modal
                    modalIndex={index}
                    stockPhotoURL={url}
                    showModalIndex={showModalIndex}
                    setShowModalIndex={setShowModalIndex}
                    setSelectedStockPhotoURL={setCoverPhotoURL}
                  >
                    <img
                      src={url}
                      alt="Cover photo"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </Modal>
                </>
              ))}
          </div>

          {isSearching && (
            <div className="my-4 w-full flex justify-center items-center">
              <CogIcon className="h-6 w-6 text-gray-500 animate-spin" />
              <span className="ml-2 text-xs text-gray-500">Loading...</span>
            </div>
          )}

          {searchResult.length > 0 && (
            <div className="mt-4 flex w-full justify-center">
              <button
                type="button"
                disabled={isSearching}
                onClick={handleLoadMore}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Load More Stock Photos...
              </button>
            </div>
          )}
        </>
      )}

      {selectedMenuItem === 'URL' && (
        <div className="mt-4">
          <label
            htmlFor="cover-photo-url"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover Photo / URL
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="cover-photo-url"
              id="cover-photo-url"
              autoComplete="off"
              placeholder="https://"
              autoFocus
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              value={coverPhotoURL}
              onChange={(e) => setCoverPhotoURL(e.target.value)}
            />
          </div>
        </div>
      )}

      {!!coverPhotoURL && (
        <div className="mt-4">
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Cover Photo / Selected Photo
          </span>

          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-4">
            <div className="text-center">
              <img
                src={coverPhotoURL}
                alt="Cover photo"
                className="mx-auto h-40 w-32 object-cover rounded-md"
              />
              <button
                type="button"
                className="mt-4 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => setCoverPhotoURL('')}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
