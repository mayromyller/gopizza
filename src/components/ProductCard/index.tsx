import React from 'react'

import { useTheme } from 'styled-components/native'
import { PressableProps } from 'react-native'
import { Feather } from '@expo/vector-icons'

import * as S from './styles'

export type ProductProps = {
  id: string
  photo_url: string
  name: string
  description: string
}

type Props = PressableProps & {
  data: ProductProps
}

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme()
  return (
    <S.Container>
      <S.Content {...rest}>
        <S.Image source={{ uri: data.photo_url }} />

        <S.Details>
          <S.Identification>
            <S.Name>{data.name}</S.Name>

            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </S.Identification>

          <S.Description>{data.description}</S.Description>
        </S.Details>
      </S.Content>

      <S.Line />
    </S.Container>
  )
}
