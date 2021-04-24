import { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { useTheme } from '@material-ui/core';

const predicateFalsy = (v) => !v; // null, undefined, empty string or 0.
const predicateNullUndefEmptyString = (v) => (v === null || v === undefined || v === '') ? true : false;
const predicateEmpty = (data) => {
  if (Array.isArray(data) && data.length <= 0) return true;
  if (typeof data === 'object' && Object.entries(data).length <= 0) return true;
  return false;
};

const isEmpty = (data, predicate) => {
  return predicate(data);
};

const useBreakpoint = () => {
  const theme = useTheme();
  /* eslint-disable-next-line consistent-return */
  const getDeviceConfig = (width) => {
    const { values } = theme.breakpoints;
    if (width < values.sm) {
      return { breakpoint: 'xs', value: 0 };
      /* eslint-disable-next-line no-else-return */
    } else if (width >= values.sm && width < values.md) {
      return { breakpoint: 'sm', value: 1 };
    } else if (width >= values.md && width < values.lg) {
      return { breakpoint: 'md', value: 2 };
    } else if (width >= values.lg && width < values.xl) {
      return { breakpoint: 'lg', value: 3 };
    } else if (width >= values.xl) {
      return { breakpoint: 'xl', value: 4 };
    }
  };

  const [breakPoint, setBreakPoint] = useState(() => getDeviceConfig(window.innerWidth, theme));

  useEffect(() => {
    const calcInnerWidth = throttle(() => {
      setBreakPoint(getDeviceConfig(window.innerWidth, theme));
    }, 200);
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return breakPoint;
};

export {
  useBreakpoint,
  isEmpty,
  predicateFalsy,
  predicateEmpty,
  predicateNullUndefEmptyString,
};
