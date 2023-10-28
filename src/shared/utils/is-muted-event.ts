import { NDKEvent, NDKTag } from '@nostr-dev-kit/ndk';

const hasMutedContent = (event: NDKEvent, muteWord: string) => event.content.includes(muteWord);

const hasMutedTags = (event: NDKEvent, muteWord: string) =>
  event.tags.some((tag: NDKTag) => tag.some((value: string) => value.includes(muteWord)));

/**
 * Checks if an event is muted based on a list of muted words.
 * @param event - The event to check.
 * @param muteList - The list of muted words.
 * @returns True if the event has muted content or tags, false otherwise.
 */
export const isMutedEvent = (event: NDKEvent, muteList: string[] | undefined) => {
  if (muteList == undefined || muteList.length == 0) return false;

  for (const muteWord of muteList) {
    if (hasMutedContent(event, muteWord)) return true;

    if (hasMutedTags(event, muteWord)) return true;
  }

  return false;
};
