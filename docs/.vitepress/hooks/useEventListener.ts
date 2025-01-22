export const useEventListener = (event: string, callback: EventListenerOrEventListenerObject) => {
  window.addEventListener(event, callback);
  return () => window.removeEventListener(event, callback);
};