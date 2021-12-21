import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';

interface IDataProps  {
  id: string;
  hour: string;
  date: string;
  day: string;
  month: string;
  year: string;
  minute: string;
}




export const Container = styled.View``;
export const Text = styled.Text``;
export const AlarmList = styled(
  FlatList as new (props: FlatListProps<IDataProps>) => FlatList<IDataProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 10 },
})``;