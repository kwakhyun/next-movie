import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SxProps, Theme } from '@mui/material';

import MovieAutocompleteItem from './MovieAutocompleteItem';
import PersonAutocompleteItem from './PersonAutocompleteItem';
import BaseAutocomplete from '../common/BaseAutocomplete';

import useDebounce from '../../hooks/useDebounce';
import useHasChanged from '../../hooks/useHasChanged';

import { Suggestion } from '../../shared/types/searchTypes';
import { Maybe } from '../../shared/types/commonTypes';
import { MediaType } from '../../shared/types/commonEnums';

import { isMovie } from '../../shared/utils/movieUtils';
import { isPerson } from '../../shared/utils/personUtils';
import { getAllPageResults } from '../../shared/utils/commonUtils';

import { searchAPI } from '../../shared/apis/searchAPI';

interface SearchAutocompleteProps {
  autoFocus?: boolean;
  sx?: SxProps<Theme>;
}

function SearchAutocomplete({ autoFocus, sx }: SearchAutocompleteProps) {
  const router = useRouter();
  const { searchQuery } = router.query;
  const queryValue = typeof searchQuery === 'string' ? searchQuery : '';
  const [searchValue, setSearchValue] = useState(queryValue);
  if (useHasChanged(queryValue)) {
    setSearchValue(queryValue);
  }

  const debouncedSearchValue = useDebounce(searchValue);
  const isSearchEnabled = !!debouncedSearchValue;
  const { data, isFetching } = useInfiniteQuery({
    ...searchAPI.searchMulti(debouncedSearchValue),
    enabled: isSearchEnabled,
  });

  const handleRedirect = (inputValue: string) => {
    if (inputValue) {
      router.push({
        pathname: '/search',
        query: { searchQuery: inputValue },
      });
    }
  };

  const handleSelect = (selectedOption: Maybe<Suggestion>) => {
    if (selectedOption) {
      switch (selectedOption.media_type) {
        case MediaType.MOVIE:
          router.push(`/movie/${selectedOption.id}`);
          break;
        case MediaType.PERSON:
          router.push(`/person/${selectedOption.id}`);
          break;
        default:
          return;
      }
    }
  };

  const options = useMemo<Suggestion[]>(
    () =>
      getAllPageResults(data).filter(
        (option) => isMovie(option) || isPerson(option),
      ),
    [data],
  );

  return (
    <BaseAutocomplete<Suggestion, false, true, true>
      sx={sx}
      placeholder="영화 제목, 감독 및 배우 검색 (영문)"
      options={options}
      renderOption={(props, option) => {
        return isMovie(option) ? (
          <MovieAutocompleteItem
            {...props}
            key={`${option.media_type}_${option.id}`}
            movie={option}
          />
        ) : (
          <PersonAutocompleteItem
            {...props}
            key={`${option.media_type}_${option.id}`}
            person={option}
          />
        );
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          // For freeSolo
          return option;
        }
        return isMovie(option) ? option.title : option.name;
      }}
      loading={isFetching}
      inputValue={searchValue ?? ''}
      onInputChange={(e, newInputValue) => setSearchValue(newInputValue)}
      freeSolo
      autoFocus={autoFocus}
      // To make repeatedly hitting Enter work, we set the value as empty string.
      // Otherwise, after user selects an option or hits enter, `onChange` does not get triggered
      // by hitting Enter again without changing the input text value.
      value=""
      onChange={(e, newValue) => {
        // Because we set freeSolo as true,
        // newValue can be a string too.
        if (typeof newValue === 'string') {
          handleRedirect(newValue);
        } else if (!Array.isArray(newValue)) {
          handleSelect(newValue);
        }
      }}
      onSearchClick={handleRedirect}
    />
  );
}

export default SearchAutocomplete;
