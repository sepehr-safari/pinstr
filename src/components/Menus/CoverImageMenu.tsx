import {
  CogIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
} from '@heroicons/react/20/solid';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Modal } from '@/components';
import { MenuTemplate } from '@/components/Menus';

import { MenuItem } from './MenuTemplate.types';

interface Props {
  coverImageURL: string;
  setCoverImageURL: (coverImageURL: string) => void;
}

const coverImageMenuItems: MenuItem[] = [
  {
    name: 'Upload',
    description: 'Upload your own cover image directly to nostr.build cloud.',
  },
  {
    name: 'Stock Images',
    description:
      'Search and select from a library of stock images provided by Unsplash.',
  },
  {
    name: 'URL',
    description: 'Enter a direct URL to an existing image on the web.',
  },
];

export default function CoverImageMenu({
  coverImageURL,
  setCoverImageURL,
}: Props) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    coverImageMenuItems[0]
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
            setCoverImageURL(url);
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

  return (
    <>
      <MenuTemplate
        items={coverImageMenuItems}
        selected={selectedMenuItem}
        setSelected={setSelectedMenuItem}
      />

      {!coverImageURL && selectedMenuItem.name === 'Upload' && (
        <div className="mt-4">
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Cover Image / Upload
          </span>

          <div className="mt-2 flex justify-center rounded-lg border border-gray-300 px-4 py-6">
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

      {!coverImageURL && selectedMenuItem.name === 'Stock Images' && (
        <>
          <span className="mt-4 block text-sm font-medium leading-6 text-gray-900">
            Cover Image / Search From Stock Images
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
                <div key={index}>
                  <div className="aspect-h-4 aspect-w-5">
                    <img
                      src={url}
                      alt="Cover Image"
                      className="object-cover object-center w-full h-full rounded-md"
                      onClick={() => setShowModalIndex(index)}
                    />
                  </div>
                  <Modal
                    modalIndex={index}
                    stockImageURL={url}
                    showModalIndex={showModalIndex}
                    setShowModalIndex={setShowModalIndex}
                    setSelectedStockImageURL={setCoverImageURL}
                  >
                    <div className="aspect-h-4 aspect-w-5">
                      <img
                        src={url}
                        alt="Cover Image"
                        className="object-cover object-center w-full h-full rounded-md"
                      />
                    </div>
                  </Modal>
                </div>
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
                Load More Stock Images...
              </button>
            </div>
          )}
        </>
      )}

      {selectedMenuItem.name === 'URL' && (
        <div className="mt-4">
          <label
            htmlFor="cover-image-url"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover Image / URL
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="cover-image-url"
              id="cover-image-url"
              autoComplete="off"
              placeholder="https://"
              autoFocus
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              value={coverImageURL}
              onChange={(e) => setCoverImageURL(e.target.value)}
            />
          </div>
        </div>
      )}

      {!!coverImageURL && (
        <div className="mt-4">
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Cover Image / Selected Image
          </span>

          <div className="mt-2 flex justify-center rounded-lg border border-gray-300 px-4 py-4">
            <div className="text-center">
              <img
                src={coverImageURL}
                alt="Cover image"
                className="mx-auto h-40 w-52 object-cover rounded-md"
              />
              <button
                type="button"
                className="mt-4 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => setCoverImageURL('')}
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
