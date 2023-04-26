import React, { useEffect, useState } from 'react';

function ApiDataDisplay({ apiData }) {
  const [jsonString, setJsonString] = useState('');

  useEffect(() => {
    if (apiData) {
      setJsonString(JSON.stringify(apiData, null, 2));
    }
  }, [apiData]);

  return (
    <pre>{jsonString}</pre>
  );
}

export default ApiDataDisplay;