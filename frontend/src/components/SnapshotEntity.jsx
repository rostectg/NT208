import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getSnapshotApi } from '../apis/snapshot/getSnapshotApi';

function SnapshotEntity() {
  const location = useLocation();
  const pathName = location.pathname;
  const snapshotId = pathName.slice(1);
  const [html, setHtml] = useState('');
  useEffect(() => {
    const getResult = getSnapshotApi.get(snapshotId);
    getResult.then((res) => {
      setHtml(res.data)
    })
  }, [snapshotId])
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default SnapshotEntity;