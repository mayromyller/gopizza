import React, { useState, useEffect } from 'react'

import { Platform, ScrollView, Alert } from 'react-native'

import firestore from '@react-native-firebase/firestore'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { ButtonBack } from '@components/ButtonBack'
import { RadioButton } from '@components/RadioButton'

import { useNavigation, useRoute } from '@react-navigation/native'

import { PIZZA_TYPES } from '../../utils/pizzaTypes'

import { OrderNavigationProps } from '@src/@types/navigation'

import { ProductProps } from '@components/ProductCard'

import * as S from './style'
import { useAuth } from '../../hooks/auth'

type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number
  }
}

export function Order() {
  const [pizza, setPizza] = useState('')
  const [order, setOrder] = useState<PizzaResponse>({} as PizzaResponse)
  const [quantity, setQuantity] = useState(0)
  const [tableNumber, setTableNumber] = useState('')
  const [isSending, setIsSending] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()
  const { id } = route.params as OrderNavigationProps

  const { user } = useAuth()

  function handleGoBack() {
    navigation.goBack()
  }

  const amount = pizza ? order.prices_sizes[pizza] * quantity : '0,00'

  function handleOrder() {
    if (!pizza) {
      return Alert.alert('Pedido', 'Selecione o tamanho da Pizza.')
    }
    if (!tableNumber) {
      return Alert.alert('Pedido', 'Inform o número da mesa.')
    }
    if (!quantity) {
      return Alert.alert('Pedido', 'Informe a quantidade.')
    }

    setIsSending(true)

    firestore()
      .collection('orders')
      .add({
        quantity,
        amount,
        order: order.name,
        pizza,
        table_number: tableNumber,
        status: 'Preparando',
        waiter_id: user?.id,
        image: order.photo_url
      })
      .then(() => navigation.navigate('home'))
      .catch(() => {
        Alert.alert(
          'Pedido',
          'Não foi possível realizar o pedido. Tente novamente mais tarde!'
        )
        setIsSending(false)
      })
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then((response) => setOrder(response.data() as PizzaResponse))
        .catch(() =>
          Alert.alert('Pedido', 'Não foi possível carregar o produto')
        )
    }
  }, [])

  return (
    <S.Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.Header>
          <ButtonBack onPress={handleGoBack} style={{ marginBottom: 108 }} />
        </S.Header>

        <S.Photo source={{ uri: order.photo_url }} />

        <S.Form>
          <S.Title>{order.name}</S.Title>
          <S.Label>Selecione o tamanho</S.Label>
          <S.Sizes>
            {PIZZA_TYPES.map((type) => (
              <RadioButton
                key={type.id}
                title={type.name}
                onPress={() => setPizza(type.id)}
                selected={pizza === type.id}
              />
            ))}
          </S.Sizes>

          <S.FormRow>
            <S.InputGroup>
              <S.Label>Número da mesa</S.Label>
              <Input keyboardType="numeric" onChangeText={setTableNumber} />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Quantidade</S.Label>
              <Input
                keyboardType="numeric"
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </S.InputGroup>
          </S.FormRow>

          <S.Price>Valor R${amount}</S.Price>

          <Button
            title="Confirmar pedido"
            onPress={handleOrder}
            isLoading={isSending}
          />
        </S.Form>
      </ScrollView>
    </S.Container>
  )
}
