import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';

interface IDataProps  {
  id: string;
  hour: number;
  minute: number;
  day: number;
  month: number;
  year: number;
  message: string;
  
}




export const Container = styled.View``;

export const AlarmList = styled(
  FlatList as new (props: FlatListProps<IDataProps>) => FlatList<IDataProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 10 },
})``;