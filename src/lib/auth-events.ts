const AUTH_EVENT = "auth-change";

export const triggerAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const onAuthChange = (callback: () => void) => {
  const handler = () => callback();
  window.addEventListener(AUTH_EVENT, handler);
  return () => window.removeEventListener(AUTH_EVENT, handler);
};