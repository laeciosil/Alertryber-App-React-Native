import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  border: 1.5px solid #e6e6e6;
  padding: 15px 30px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.shape};
  margin: 8px 0;
  border-radius: 5px;
`;

export const Time = styled.View`

`;
export const Hour = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;
export const Date = styled.Text`
  color: #999;
`;

export const Button = styled.TouchableOpacity`
  background-color: red;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-radius: 5px;
`;

export const Title = styled.Text`
    color: #FFFFFF;
    font-size: 18px;
`;