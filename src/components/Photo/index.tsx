import React from 'react'

import * as S from './styles'

type Props = {
  uri: string | null
}

export function Photo({ uri }: Props) {
  if (uri) {
    return <S.Image source={{ uri }} />
  }

  return (
    <S.Placeholder>
      <S.Title>Nenhum foto {'\n'} carregada</S.Title>
    </S.Placeholder>
  )
}
