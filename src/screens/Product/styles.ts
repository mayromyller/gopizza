import styled, { css } from 'styled-components/native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from '@components/Button'

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT
}))`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: ${getStatusBarHeight() + 33}px 20px 24px;
`

export const Title = styled.Text`
  font-size: 24px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`

export const DeleteLabel = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
`

export const Upload = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0;
  padding: 0 20px;
`

export const PickImageButton = styled(Button)`
  max-width: 90px;
`

export const Form = styled.View`
  width: 100%;
  padding: 24px;
`

export const Label = styled.Text`
  margin-bottom: 12px;
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`

export const InputGroup = styled.View`
  width: 100%;
  margin-bottom: 16px;
`

export const InputGroupHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MaxCharacters = styled.Text`
  margin-bottom: 10px;
  font-size: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`
