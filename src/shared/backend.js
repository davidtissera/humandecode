import { useEffect, useState } from 'react';

const apiKey = '666af153f2440476bfb30040d7b9d152';

export const appendQueryParams = (queryParams = {}) => {
  const formattedQueryParameters = Object.entries(queryParams).map((queryParam) => {
    const [key, value] = queryParam;
    if (Array.isArray(value)) {
      const joinedValues = value.join(',');
      return `${key}=[${joinedValues}]`;
    } else {
      return value ? `${key}=${value}` : `${key}=''`;
    }
  });
  return formattedQueryParameters.join('&');
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
      'Content-Type': 'application/json'
    },
    ...additionalConfig,
  }
  const response = await fetch(urlComplete, config);
  try {
    const json = await response.json();
    if (!response.ok) throw json.status_message;
    return json;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getData = async ({ url, queryParams }) => {
  return apiCommunication({ url, queryParams });
};

const useSetApiDataToState = ({ promise, deps }) => {
  const initialState = {
    data: [],
    loading: false,
    error: '',
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState({ ...state, loading: true });
    promise.then((response) => {
      console.log(response);
      setState({ data: response, loading: false, error: '' })
    });
    promise.catch((error) => {
      console.log(error);
      setState({ data: [], loading: false, error });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);

  return [state, setState];
};

export { 
  getData,
  useSetApiDataToState,
};

