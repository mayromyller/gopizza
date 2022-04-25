import React from 'react'

import { TouchableOpacityProps } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useTheme } from 'styled-components/native'

import * as S from './styles'

export function ButtonBack({ ...rest }: TouchableOpacityProps) {
  const { COLORS } = useTheme()

  return (
    <S.Container {...rest}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={20}
        color={COLORS.TITLE}
      />
    </S.Container>
  )
}
