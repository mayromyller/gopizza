import React from 'react'

import { TouchableOpacityProps, ActivityIndicator } from 'react-native'

import * as S from './style'

type Props = TouchableOpacityProps & {
  title: string
  type?: S.TypeProps
  isLoading?: boolean
}

export function Button({ type = 'primary', title, isLoading, ...rest }: Props) {
  return (
    <S.Container type={type} disabled={isLoading} {...rest}>
      {isLoading ? <S.Load /> : <S.Title>{title}</S.Title>}
    </S.Container>
  )
}
