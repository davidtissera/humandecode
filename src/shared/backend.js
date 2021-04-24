import { useEffect, useState } from 'react';
import { capitalize } from 'lodash';

const apiKey = '666af153f2440476bfb30040d7b9d152';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

export const appendQueryParams = (queryParams = {}) => {
  const formattedQueryParameters = Object.entries(queryParams).map(
    (queryParam) => {
      const [key, value] = queryParam;
      if (Array.isArray(value)) {
        const joinedValues = value.join(',');
        return `${key}=[${joinedValues}]`;
      } else {
        return value ? `${key}=${value}` : `${key}=''`;
      }
    }
  );
  return formattedQueryParameters.join('&');
};

export const transformError = (error) => {
  if (Array.isArray(error)) return error.map((err) => capitalize(err)).join(' ');
  else if (typeof error === 'number') return error;
  else if (typeof error === 'string') return capitalize(error);
  else return JSON.stringify(error);
};

const apiCommunication = async ({ url, queryParams, additionalConfig }) => {
  const allQueryParams = {
    ...queryParams,
    api_key: apiKey,
  };
  const appendedQueryParams = appendQueryParams(allQueryParams);
  const urlComplete = `https://api.themoviedb.org/3${url}?${appendedQueryParams}`;
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...additionalConfig,
  };
  const response = await fetch(urlComplete, config);
  try {
    const json = await response.json();
    if (!response.ok) {
      if (json.status_message) throw json.status_message;
      else if (json.errors) throw json.errors;
      else throw response.status;
    }
    return json;
  } catch (e) {
    console.error(transformError(e));
    throw e;
  }
};

const getData = async ({ url, queryParams }) => {
  return apiCommunication({ url, queryParams });
};

const useSetApiDataToState = ({ promise, deps = [], timeoutMsecs }) => {
  const initialState = {
    data: [],
    loading: true,
    error: '',
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState({ ...state, loading: true });
    promise.then((response) => {
      const setResponseToState = () => {
        setState({ data: response, loading: false, error: '' });
      };
      // setting a timeout for UX
      if (timeoutMsecs > 0)
        setTimeout(() => setResponseToState(), timeoutMsecs);
      else setResponseToState();
    });
    promise.catch((err) => {
      const error = transformError(err);
      setState({ data: [], loading: false, error });
    });
  }, deps);

  return [state, setState];
};

export { getData, useSetApiDataToState, imageBaseUrl };
