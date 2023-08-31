import { useMemo, useRef } from 'react';

interface Options {
  threshold?: number;
  onStart?: (e: MouseEvent) => void;
  onFinish?: (e: MouseEvent) => void;
  onCancel?: (e: MouseEvent) => void;
}

export const useLongPress = (callback: (e: MouseEvent) => void, options = {} as Options) => {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  const isLongPressActive = useRef(false);
  const isPressed = useRef(false);
  const timerId = useRef<number>();

  return useMemo(() => {
    if (typeof callback !== 'function') {
      return {};
    }

    const start = (event: MouseEvent) => {
      if (onStart) {
        onStart(event);
      }

      isPressed.current = true;
      timerId.current = setTimeout(() => {
        callback(event);
        isLongPressActive.current = true;
      }, threshold);
    };

    const cancel = (event: MouseEvent) => {
      if (isLongPressActive.current) {
        if (onFinish) {
          onFinish(event);
        }
      } else if (isPressed.current) {
        if (onCancel) {
          onCancel(event);
        }
      }

      isLongPressActive.current = false;
      isPressed.current = false;

      if (timerId.current) {
        window.clearTimeout(timerId.current);
      }
    };

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    };

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel,
    };

    return { ...mouseHandlers, ...touchHandlers };
  }, [callback, threshold, onCancel, onFinish, onStart]);
};
