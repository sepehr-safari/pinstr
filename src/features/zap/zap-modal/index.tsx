import { Loader2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Small } from '@/shared/components/ui/typography/small';

import { ZAP_AMOUNTS } from './config';
import { useZapModal } from './hooks';
import { ZapTarget } from './types';

export const ZapModal = ({
  children,
  target,
}: {
  children: React.ReactNode;
  target: ZapTarget;
}) => {
  const {
    comment,
    image,
    name,
    selectedAmount,
    setComment,
    setSelectedAmount,
    processing,
    process,
  } = useZapModal({
    target,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback>{name?.[0]}</AvatarFallback>
            </Avatar>

            <span>Send sats to {name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-2">
          <Small>Zap amount in Sats:</Small>

          <div className="grid grid-cols-4 gap-4">
            {ZAP_AMOUNTS.map((zapAmount) => (
              <Button
                key={zapAmount.id}
                onClick={() => setSelectedAmount(zapAmount)}
                variant={selectedAmount.id == zapAmount.id ? 'default' : 'outline'}
              >
                {zapAmount.label}
              </Button>
            ))}

            <Button
              onClick={() => setSelectedAmount({ amount: 21, id: 0, label: '' })}
              variant={ZAP_AMOUNTS.includes(selectedAmount) ? 'outline' : 'default'}
            >
              Custom
            </Button>

            {!ZAP_AMOUNTS.includes(selectedAmount) && (
              <Input
                placeholder="Custom amount in Sats"
                type="number"
                min={1}
                autoFocus
                className="col-span-3"
                value={selectedAmount.amount}
                onChange={(e) =>
                  setSelectedAmount({ id: 0, amount: parseInt(e.target.value), label: '' })
                }
              />
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Small>Comment:</Small>

          <Input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <DialogFooter>
          <Button
            className="w-full"
            disabled={!selectedAmount.amount || processing}
            onClick={() => {
              process(target);
            }}
          >
            {processing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              `⚡️ Zap ${selectedAmount.amount || '_'} sats`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
