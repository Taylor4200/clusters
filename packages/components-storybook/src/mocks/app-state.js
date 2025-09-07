// Mock for $app/state
export const page = {
  url: {
    searchParams: {
      get: (key) => {
        if (typeof window !== 'undefined') {
          return new URLSearchParams(window.location.search).get(key);
        }
        return null;
      }
    }
  }
};
