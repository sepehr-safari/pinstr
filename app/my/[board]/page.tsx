'use client';

import {
  FolderIcon,
  PaperClipIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Field, Form, Formik, FormikProps } from 'formik';

import { useAddPin, useCurrentBoard, useInsertHeader } from '@/hooks';

const PinInput = ({ field, ...props }: any) => (
  <input
    type="text"
    className="input input-sm bg-neutral text-neutral-content"
    autoComplete="off"
    {...field}
    {...props}
  />
);

const NewHeaderInput = ({ field, ...props }: any) => (
  <input
    type="text"
    className="bg-transparent border-b-[1px] border-neutral outline-none text-sm text-neutral-content w-28"
    autoComplete="off"
    {...field}
    {...props}
  />
);

const MyBoard = () => {
  const { currentBoard } = useCurrentBoard();

  const { addPin } = useAddPin();
  const { insertHeader } = useInsertHeader();

  return (
    <>
      <div className="w-full p-4 md:p-10 lg:w-3/4">
        <div className="rounded-lg bg-base-200 border-[1px] border-neutral p-8 gap-2 flex flex-col">
          <div className="flex gap-2 items-start">
            <FolderIcon className="w-6 h-6 " />
            <p className="text-lg font-bold">{currentBoard.name}</p>
          </div>

          <p className="text-xs">Let's pin on this board!</p>

          <hr className="my-4 border-neutral" />

          <Formik
            initialValues={{
              newHeader: '',
              pins: currentBoard.headers?.reduce<{ [name: string]: string }>(
                (acc, header) => {
                  acc[header] = '';
                  return acc;
                },
                {}
              ),
            }}
            onSubmit={(values, actions) => {
              if (values.pins) {
                let name = '';
                let pins = new Array<string>();

                Object.entries(values.pins).forEach(([key, value]) => {
                  if (key === 'Name') {
                    name = value;
                    return;
                  } else if (value) {
                    pins.push(value);
                  }
                });

                addPin(name, pins);
              }
              actions.setSubmitting(false);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form className="flex flex-col gap-2">
                {(currentBoard.headers || []).map((header) => (
                  <div key={header} className="flex flex-col gap-2">
                    <label htmlFor={header} className="text-xs">
                      {header}:
                    </label>
                    <Field
                      name={`pins[${header}]`}
                      placeholder={header}
                      component={PinInput}
                    />
                  </div>
                ))}

                <div className="flex gap-2 items-center mt-4">
                  <Field
                    name="newHeader"
                    placeholder="Add New Header"
                    component={NewHeaderInput}
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    onClick={() => insertHeader(props.values.newHeader)}
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>

                <hr className="my-4 border-neutral" />

                <button className="btn btn-primary ml-auto gap-2" type="submit">
                  <div className="w-5 h-5 inline-block">
                    <PaperClipIcon />
                  </div>
                  Pin it!
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

// {!pins.length && eose && <></>}

//  <label htmlFor="pins-drawer" className="btn btn-primary btn-sm lg:hidden">
//    Create a new pin
//  </label>;

export default MyBoard;
