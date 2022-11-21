import { RootState } from '../store';

export const selectGroups = ({ groups }: RootState) => groups.list;
