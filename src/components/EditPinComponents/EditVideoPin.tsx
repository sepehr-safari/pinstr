import { ParsedPin } from '@/types';

export const EditVideoPin = ({
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
            tabIndex={1}
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
            Link to Video
          </span>
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="Content"
            id="Content"
            autoComplete="off"
            autoFocus
            tabIndex={1}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            value={pin.value['Content']}
            onChange={(e) => {
              pin.set({ ...pin.value, Content: e.target.value });
            }}
          />
        </div>
      </div>

      {headers.length > 2 &&
        headers.slice(2).map((header, index) => (
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
                tabIndex={index + 2}
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
