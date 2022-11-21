import React, { useCallback, useMemo } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const sortFields = ['ticker', 'price', 'dividend', 'yield'] as const;
export type SortFieldsType = typeof sortFields[number];

const GroupSortSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortFieldChange = useCallback(
    (ev: SelectChangeEvent<'' | SortFieldsType>) => {
      setSearchParams((prevParams) => {
        const sortField = ev.target.value;
        if (!sortField) {
          prevParams.delete('sortField');
          prevParams.delete('sortOrder');
        } else {
          prevParams.set('sortField', sortField);
          prevParams.set('sortOrder', 'asc');
        }
        return prevParams;
      });
    },
    [setSearchParams]
  );
  const handleSortOrderChange = useCallback(() => {
    setSearchParams((prevParams) => {
      const prevOrder = searchParams.get('sortOrder');
      prevParams.set('sortOrder', prevOrder === 'asc' ? 'desc' : 'asc');

      return prevParams;
    });
  }, [searchParams, setSearchParams]);
  const currentSortField = useMemo(
    () => searchParams.get('sortField'),
    [searchParams]
  );
  const currentSortOrder = useMemo(
    () => searchParams.get('sortOrder'),
    [searchParams]
  );

  return (
    <div className='my-3'>
      <FormControl className='w-36'>
        <InputLabel id='sort-label'>Sort</InputLabel>
        <Select
          labelId='sort-label'
          value={(searchParams.get('sortField') as SortFieldsType) || ''}
          label='Sort'
          onChange={handleSortFieldChange}
        >
          <MenuItem className='relative' value=''>
            No sort
          </MenuItem>
          {sortFields.map((sortField) => (
            <MenuItem
              key={sortField}
              onClick={handleSortOrderChange}
              className='relative'
              value={sortField}
              sx={{
                padding: 2,
              }}
            >
              <span>
                {sortField
                  ? [...sortField].map((letter, index) =>
                      !index ? letter.toUpperCase() : letter
                    )
                  : ''}
              </span>
              {currentSortField && currentSortField === sortField && (
                <span className='absolute right-5 top-2'>
                  <Checkbox
                    checked={currentSortOrder === 'asc'}
                    icon={
                      <ArrowUpwardIcon
                        sx={{
                          height: 20,
                          width: 20,
                          transform: 'rotate(180deg)',
                        }}
                      />
                    }
                    disableRipple
                    checkedIcon={
                      <ArrowUpwardIcon
                        sx={{
                          height: 20,
                          width: 20,
                        }}
                      />
                    }
                  />
                </span>
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default GroupSortSelect;
