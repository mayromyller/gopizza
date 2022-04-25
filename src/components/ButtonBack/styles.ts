import styled from 'styled-components/native'

import { TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7
})`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY_100};
`
