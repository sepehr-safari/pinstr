import { useNip07, useProfiles } from 'nostr-hooks';
import { useState } from 'react';

import { useToast } from '@/shared/components/ui/use-toast';

import { ZAP_AMOUNTS } from '../config';
import { ZapTarget } from '../types';
import { payInvoiceByWebln } from '../utils';

export const useZapModal = ({ target }: { target: ZapTarget }) => {
  const [selectedAmount, setSelectedAmount] = useState(ZAP_AMOUNTS[0]);
  const [comment, setComment] = useState('');
  const [processing, setProcessing] = useState(false);

  useNip07();

  const { toast } = useToast();

  const { events, users } = useProfiles(
    target.type == 'event' ? { events: [target.event] } : { users: [target.user] },
  );

  let name = '';
  let image = '';
  if (target.type == 'event') {
    if (events.length > 0) {
      name = events[0].author.profile?.name || '';
      image = events[0].author.profile?.image || '';
    }
  } else {
    if (users.length > 0) {
      name = users[0].profile?.name || '';
      image = users[0].profile?.image || '';
    }
  }

  const process = (target: ZapTarget) => {
    setProcessing(true);

    const _target = target.type == 'event' ? target.event : target.user;

    _target
      .zap(selectedAmount.amount * 1000, comment)
      .then((invoice) => {
        invoice &&
          payInvoiceByWebln(invoice)
            .then((res) =>
              res
                ? toast({ title: 'Success' })
                : toast({ title: 'Failed', variant: 'destructive' }),
            )
            .finally(() => setProcessing(false));
      })
      .catch(() => {
        toast({ title: 'Failed', variant: 'destructive' });

        setProcessing(false);
      });
  };

  return {
    selectedAmount,
    setSelectedAmount,
    comment,
    setComment,
    name,
    image,
    processing,
    process,
  };
};
