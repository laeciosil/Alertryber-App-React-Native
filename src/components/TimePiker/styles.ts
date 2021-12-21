import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View``;
export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.button};
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 10px 24px;
  border-radius: 5px;
`;
export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
`;