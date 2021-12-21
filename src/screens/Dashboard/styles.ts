import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled.View`
   flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(20)}px;
  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const Text = styled.Text`
 color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(30)}px;
  font-weight: bold;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 0 24px;
`;