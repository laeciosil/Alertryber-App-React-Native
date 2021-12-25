import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  border: 1.5px solid #e6e6e6;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.shape};
  margin: 8px 0;
  border-radius: 5px;
  
`;

export const Header = styled.View`
 align-items: center;
 background-color: ${({ theme }) => theme.colors.primary};
 padding: 3px 0;
 border-top-left-radius: 5px;
 border-top-right-radius: 5px;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 30px;
  margin-top: 5px;
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
  background-color: ${({ theme }) => theme.colors.buttonCancel};
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-radius: 5px;
`;

export const Title = styled.Text`
    color: #FFFFFF;
    font-size: 18px;
`;
export const TitleButton = styled.Text`
    color: #000;
    font-size: 18px;
`;
