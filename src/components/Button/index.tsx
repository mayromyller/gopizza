import React from 'react'

import { RectButtonProps } from 'react-native-gesture-handler'

import * as S from './style'

type Props = RectButtonProps & {
  title: string
  type?: S.TypeProps
  isLoading?: boolean
}

export function Button({ type = 'primary', title, isLoading, ...rest }: Props) {
  return (
    <S.Container type={type} enabled={!isLoading} {...rest}>
      {isLoading ? <S.Load /> : <S.Title>{title}</S.Title>}
    </S.Container>
  )
}
