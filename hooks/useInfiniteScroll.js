import { useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = (loadMore) => {
  const observer = useRef();

  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loadMore]);

  return lastElementRef;
};

export default useInfiniteScroll;