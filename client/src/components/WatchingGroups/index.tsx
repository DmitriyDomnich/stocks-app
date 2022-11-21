import React, { useMemo } from 'react';
import GroupBar from './GroupBar';
import { useAppSelector } from '../../rdx/hooks';
import { selectGroups } from '../../rdx/groups/selectors';
import AddNewGroupForm from './AddNewGroupForm';
import { useSearchParams } from 'react-router-dom';
import SelectedGroup from './SelectedGroup';

const WatchingGroups = () => {
  const groups = useAppSelector(selectGroups);
  const [searchParams] = useSearchParams();

  const selectedGroup = useMemo(() => {
    const selectedGroupId = searchParams.get('group');
    if (selectedGroupId) {
      return groups.find((group) => group.id === selectedGroupId);
    }
    return null;
  }, [searchParams, groups]);

  return (
    <div className='bg-slate-200 p-2'>
      <h5 className='text-gray-500 uppercase'>Your watching groups</h5>
      <div className='flex flex-wrap space-x-2 space-y-2 items-center'>
        <AddNewGroupForm groups={groups} />
        {groups.length
          ? groups.map((group) => (
              <GroupBar
                selected={!!(selectedGroup && selectedGroup.id === group.id)}
                group={group}
                key={group.id}
              />
            ))
          : null}
      </div>
      {selectedGroup ? <SelectedGroup group={selectedGroup} /> : null}
    </div>
  );
};

export default WatchingGroups;
