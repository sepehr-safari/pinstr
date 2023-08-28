import { ImageMenu } from '@/components/Menus';
import { ParsedPin } from '@/types';

export const EditTextPin = ({
  pin,
}: {
  pin: { value: ParsedPin; set: (value: ParsedPin) => void };
}) => {
  const headers = Object.keys(pin.value);

  return (
    <>
      <div>
        <label htmlFor="Title" className="flex flex-col">
          <span className="text-sm font-medium leading-6 text-gray-900">
            Title
          </span>
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="Title"
            id="Title"
            autoComplete="off"
            autoFocus
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            value={pin.value['Title']}
            onChange={(e) => {
              pin.set({ ...pin.value, Title: e.target.value });
            }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="Content" className="flex flex-col">
          <span className="text-sm font-medium leading-6 text-gray-900">
            Text
          </span>
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="Content"
            id="Content"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            value={pin.value['Content']}
            onChange={(e) => {
              pin.set({ ...pin.value, Content: e.target.value });
            }}
          />
        </div>
      </div>

      <div>
        <span className="flex flex-col">
          <span className="text-sm font-medium leading-6 text-gray-900">
            Image
          </span>
          <span className="text-xs font-light text-gray-500">
            Select an option and choose a high quality image that represents
            your pin.
          </span>
        </span>
        <div className="mt-2">
          <ImageMenu
            image={pin.value['Image']}
            setImage={(url) => {
              pin.set({ ...pin.value, Image: url });
            }}
          />
        </div>
      </div>

      {headers.length > 3 &&
        headers.slice(3).map((header, index) => (
          <div key={index}>
            <label htmlFor={header} className="flex flex-col">
              <span className="text-sm font-medium leading-6 text-gray-900">
                {header}
              </span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name={header}
                id={header}
                autoComplete="off"
                tabIndex={index + 3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                value={pin.value[header]}
                onChange={(e) => {
                  pin.set({ ...pin.value, [header]: e.target.value });
                }}
              />
            </div>
          </div>
        ))}
    </>
  );
};
