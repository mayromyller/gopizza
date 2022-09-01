import React from 'react'

import { TouchableOpacityProps } from 'react-native'

import * as S from './style'

type Props = TouchableOpacityProps & {
  index: number
}

export function OrderCard({ index }: Props) {
  return (
    <S.Container index={index}>
      <S.Image source={{ uri: 'https://github.com/mayromyller.png' }} />

      <S.Name>4 Queijos</S.Name>

      <S.Description>Mesa 5 - Qnt: 1</S.Description>

      <S.StatusContainer status="Pronto">
        <S.StatusLabel status="Pronto">Pronto</S.StatusLabel>
      </S.StatusContainer>
    </S.Container>
  )
}
