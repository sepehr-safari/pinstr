'use client';

import { useBoards } from '@/hooks';
import {
  BoltIcon,
  ChatBubbleLeftIcon,
  FolderIcon,
  PaperClipIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

type BoardCardProps = {
  pubkey: string;
  boardName: string;
};

const BoardCard = ({ pubkey, boardName }: BoardCardProps) => {
  const { boards } = useBoards({
    pubkey,
    boardName,
    enabled: !!pubkey && !!boardName,
  });

  return (
    <>
      <div className="flex flex-col gap-2 border-neutral-700 border-[1px] rounded-xl bg-base-200 max-w-screen-lg w-full">
        <div className="p-4 gap-4 flex items-center border-b border-neutral">
          <div className="avatar">
            <div className="w-12 rounded-xl">
              <img src="https://imgproxy.iris.to/insecure/plain/https://nostr.build/i/nostr.build_d8f1300ae6d892fbc7f7f0b4cd61b43055f5da43a6b525b95a0fc2e05998d80f.jpg" />
            </div>
          </div>
          <h2 className="text-lg">Sepehr</h2>
          <div className="ml-auto">
            <p className="text-xs text-neutral-500">1 day ago</p>
          </div>
        </div>
        <div className="flex flex-col grow gap-4 p-4">
          <div className="flex gap-2">
            <h3 className="text-lg font-bold flex items-start gap-2">
              <div className="h-6 w-6">
                <FolderIcon />
              </div>
              Favorite Movies
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-neutral rounded-lg"
            >
              <div className="collapse-title p-2 min-h-0 flex gap-2 items-center">
                <div className="h-5 w-5">
                  <PaperClipIcon />
                </div>
                The Godfather
              </div>
              <div className="collapse-content">
                <ul>
                  <li>
                    <p>
                      <strong>Release Date:</strong> 24 March 1972 (USA)
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Genres:</strong> Crime, Drama
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Director:</strong> Francis Ford Coppola
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Writers:</strong> Mario Puzo, Francis Ford Coppola
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Stars:</strong> Marlon Brando, Al Pacino, James
                      Caan
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>IMDB Rating:</strong> 9.2
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Link: </strong>
                      <a
                        className="text-primary"
                        href="https://www.imdb.com/title/tt0068646/"
                      >
                        https://www.imdb.com/title/tt0068646/
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-neutral rounded-lg"
            >
              <div className="collapse-title p-2 min-h-0 flex gap-2 items-center">
                <div className="h-5 w-5">
                  <PaperClipIcon />
                </div>
                Interstellar
              </div>
              <div className="collapse-content">
                <ul>
                  <li>
                    <p>
                      <strong>Release Date:</strong> 7 November 2014 (USA)
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Genres:</strong> Adventure, Drama, Sci-Fi
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Director:</strong> Christopher Nolan
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Writers:</strong> Jonathan Nolan, Christopher
                      Nolan
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Stars:</strong> Matthew McConaughey, Anne
                      Hathaway, Jessica Chastain
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>IMDB Rating:</strong> 8.6
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Link: </strong>
                      <a
                        className="text-primary"
                        href="https://www.imdb.com/title/tt0816692/"
                      >
                        https://www.imdb.com/title/tt0816692/
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-neutral rounded-lg"
            >
              <div className="collapse-title p-2 min-h-0 flex gap-2 items-center">
                <div className="h-5 w-5">
                  <PaperClipIcon />
                </div>
                Inception
              </div>
              <div className="collapse-content">
                <ul>
                  <li>
                    <p>
                      <strong>Release Date:</strong> 16 July 2010 (USA)
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Genres:</strong> Action, Adventure, Sci-Fi
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Director:</strong> Christopher Nolan
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Writers:</strong> Christopher Nolan
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Stars:</strong> Leonardo DiCaprio, Joseph
                      Gordon-Levitt, Elliot Page
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>IMDB Rating: </strong>8.8
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Link: </strong>
                      <a
                        className="text-primary"
                        href="https://www.imdb.com/title/tt1375666/"
                      >
                        https://www.imdb.com/title/tt1375666/
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 gap-20 flex items-center border-t border-neutral">
          <div className="h-5 w-5">
            <StarIcon />
          </div>
          <div className="h-5 w-5">
            <ChatBubbleLeftIcon />
          </div>
          <div className="h-5 w-5">
            <BoltIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardCard;
