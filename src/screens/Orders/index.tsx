import React from 'react'

import { FlatList } from 'react-native'
import { OrderCard } from '@components/OrderCard'
import { ItemSeparator } from '@components/ItemSeparator'

import * as S from './style'

export function Orders() {
  return (
    <S.Container>
      <S.Header>
        <S.Title> Pedidos Feitos</S.Title>
      </S.Header>

      <FlatList
        data={['1', '2', '3']}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => <OrderCard index={index} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </S.Container>
  )
}
