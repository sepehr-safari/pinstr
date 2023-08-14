import {
  BoltIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
} from '@heroicons/react/20/solid';

import {
  LinkGrid,
  NoteGrid,
  PeopleGrid,
  PictureGrid,
  VideoGrid,
} from '@/components/Lists';
import { useParams } from 'react-router-dom';

const zapUrls = [
  {
    name: 'Alby',
    address: 'https://getalby.com',
    imageUrl:
      'https://source.unsplash.com/random/?bitcoin&sig=' + Math.random(),
  },
  {
    name: 'Zebedee',
    address: 'https://zebedee.io',
    imageUrl:
      'https://source.unsplash.com/random/?bitcoin&sig=' + Math.random(),
  },
  {
    name: 'Wallet of Satoshi',
    address: 'https://www.walletofsatoshi.com/',
    imageUrl: 'https://source.unsplash.com/random/?crypto&sig=' + Math.random(),
  },
  {
    name: 'BTCPay Server',
    address: 'https://btcpayserver.org',
    imageUrl:
      'https://source.unsplash.com/random/?payment&sig=' + Math.random(),
  },
  {
    name: 'Nostdress',
    address: 'https://github.com/believethehype/nostdress',
    imageUrl: 'https://source.unsplash.com/random/?wallet&sig=' + Math.random(),
  },
  {
    name: 'Geyser',
    address: 'https://geyser.fund',
    imageUrl:
      'https://source.unsplash.com/random/?payment&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
];
const bookUrls = [
  {
    name: 'Fourth Wing (The Empyrean, 1)',
    address:
      'https://www.amazon.com/Fourth-Wing-Empyrean-Rebecca-Yarros/dp/1649374046/ref=zg_sccl_2/146-8413031-0428543?pd_rd_w=obxQl&content-id=amzn1.sym.193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_p=193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_r=X5R3Y0QYG30VPMTFSJKG&pd_rd_wg=kk2UW&pd_rd_r=30a32f58-2e34-41fd-bc00-eb7914b0345d&pd_rd_i=1649374046&psc=1',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91n7p-j5aqL._AC_UL381_SR381,381_.jpg',
  },
  {
    name: 'The 48 Laws of Power',
    address:
      'https://www.amazon.com/48-Laws-Power-Robert-Greene/dp/0140280197/ref=zg_sccl_2/146-8413031-0428543?pd_rd_w=obxQl&content-id=amzn1.sym.193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_p=193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_r=X5R3Y0QYG30VPMTFSJKG&pd_rd_wg=kk2UW&pd_rd_r=30a32f58-2e34-41fd-bc00-eb7914b0345d&pd_rd_i=0140280197&psc=1',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71aG+xDKSYL._AC_UL210_SR195,210_.jpg',
  },
  {
    name: 'The Housemaid',
    address:
      'https://www.amazon.com/Housemaid-Freida-McFadden/dp/1538742578/ref=zg_sccl_2/146-8413031-0428543?pd_rd_w=obxQl&content-id=amzn1.sym.193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_p=193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_r=X5R3Y0QYG30VPMTFSJKG&pd_rd_wg=kk2UW&pd_rd_r=30a32f58-2e34-41fd-bc00-eb7914b0345d&pd_rd_i=1538742578&psc=1',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81WduXjuKwL._AC_UL210_SR195,210_.jpg',
  },
  {
    name: 'A Little Life',
    address:
      'https://www.amazon.com/Little-Life-Hanya-Yanagihara/dp/0804172706/ref=zg_sccl_2/146-8413031-0428543?pd_rd_w=obxQl&content-id=amzn1.sym.193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_p=193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_r=X5R3Y0QYG30VPMTFSJKG&pd_rd_wg=kk2UW&pd_rd_r=30a32f58-2e34-41fd-bc00-eb7914b0345d&pd_rd_i=0804172706&psc=1',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91fRT+cJNzL._AC_UL210_SR195,210_.jpg',
  },
  {
    name: 'It Starts with Us: A Novel (2) (It Ends with Us)',
    address:
      'https://www.amazon.com/Starts-Us-Novel-Ends/dp/1668001225/ref=zg_sccl_2/146-8413031-0428543?pd_rd_w=obxQl&content-id=amzn1.sym.193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_p=193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_r=X5R3Y0QYG30VPMTFSJKG&pd_rd_wg=kk2UW&pd_rd_r=30a32f58-2e34-41fd-bc00-eb7914b0345d&pd_rd_i=1668001225&psc=1',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71PNGYHykrL._AC_UL210_SR195,210_.jpg',
  },
  {
    name: 'I Love You to the Moon and Back',
    address:
      'https://www.amazon.com/I-Love-You-Moon-Back/dp/1589255518/ref=zg_sccl_2/146-8413031-0428543?pd_rd_w=obxQl&content-id=amzn1.sym.193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_p=193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_r=X5R3Y0QYG30VPMTFSJKG&pd_rd_wg=kk2UW&pd_rd_r=30a32f58-2e34-41fd-bc00-eb7914b0345d&pd_rd_i=1589255518&psc=1',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/8144Vic9C5L._AC_UL210_SR195,210_.jpg',
  },
];

export default function Pins() {
  const params = useParams();
  const boardName = params.boardName;

  return (
    <>
      <div className="gap-8 flex flex-col lg:flex-row">
        <div className="mx-auto lg:mx-0">
          <div className="w-64 aspect-w-5 aspect-h-4 rounded-md bg-gray-200">
            <img
              src={`https://source.unsplash.com/random/?${boardName}&sig=${Math.random()}`}
              alt=""
              className="w-full h-full object-cover object-center rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between items-center lg:items-start">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 text-center lg:text-start xl:text-2xl">
              {boardName}
            </h2>

            <div className="mt-2 inline-flex w-full justify-center gap-1 text-xs font-light text-black/30 lg:gap-2 lg:justify-start">
              <span>Nostr Profiles (Kind: 30000)</span>
              <span>|</span>
              <span>Technology</span>
              <span>|</span>
              <span>18 days ago</span>
            </div>
          </div>

          <p className="mt-4 text-sm font-light text-gray-500 text-center max-w-screen-sm lg:max-w-none lg:text-justify lg:mt-auto">
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>

          <div className="mt-4 flex gap-4 lg:mt-auto">
            <button className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800">
              <HandThumbUpIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="">21</span>
            </button>
            <button className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800">
              <BoltIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="">2100</span>
            </button>
            <button className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800">
              <ChatBubbleLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="">4</span>
            </button>
          </div>
        </div>
      </div>

      {boardName?.includes('Geek') ? (
        <PeopleGrid />
      ) : boardName?.includes('Encyclopedia') ? (
        <NoteGrid />
      ) : boardName?.includes('Zap') ? (
        <LinkGrid urls={zapUrls} />
      ) : boardName?.includes('Pizza') ? (
        <PictureGrid />
      ) : boardName?.includes('Movies') ? (
        <VideoGrid />
      ) : boardName?.includes('Books') ? (
        <LinkGrid urls={bookUrls} />
      ) : (
        <></>
      )}
    </>
  );
}
