import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function useSearchKeyword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => searchParams.get('keyword') || '');

  function onKeywordChange(nKeyword) {
    setKeyword(nKeyword);
    setSearchParams({ keyword: nKeyword });
  }

  return [keyword, onKeywordChange];
}

export default useSearchKeyword;
