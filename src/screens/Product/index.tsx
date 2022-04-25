import React, { useState } from 'react'

import { Alert, ScrollView, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as ImagePicker from 'expo-image-picker'
import * as yup from 'yup'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import {
  ControlledInput,
  ControlledInputPrice
} from '@components/ControlledInput'
import { ButtonBack } from '@components/ButtonBack'
import { Button } from '@components/Button'
import { Photo } from '@components/Photo'

import * as S from './styles'

type FormData = {
  name: string
  description: string
  sizeP: string
  sizeM: string
  sizeG: string
}

const schema = yup.object({
  name: yup.string().required('Informe o nome da Pizza'),
  description: yup.string().required('Informe a descrição da Pizza'),
  sizeP: yup.string().required('Informe o preço de todos os tamanhos da Pizza'),
  sizeM: yup.string().required('Informe o preço de todos os tamanhos da Pizza'),
  sizeG: yup.string().required('Informe o preço de todos os tamanhos da Pizza')
})

export function Product() {
  const [image, setImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      })

      if (!result.cancelled) {
        setImage(result.uri)
      }
    }
  }

  async function handleAdd(data: FormData) {
    if (!image) {
      return Alert.alert('Imagem', 'Selecione a imagem da pizza.')
    }

    setIsLoading(true)

    const fileName = new Date().getTime()
    const reference = storage().ref(`/pizzas/${fileName}.png`)

    await reference.putFile(image)
    const photo_url = await reference.getDownloadURL()

    const { name, description, sizeG, sizeM, sizeP } = data

    firestore()
      .collection('pizzas')
      .add({
        name,
        name_insensitive: data.name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: sizeP,
          m: sizeM,
          g: sizeG
        },
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso'))
      .catch(() =>
        Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza')
      )
      .finally(() => setIsLoading(false))
  }

  return (
    <S.Container>
      <S.Header>
        <ButtonBack />

        <S.Title>Cadastrar</S.Title>

        <TouchableOpacity>
          <S.DeleteLabel>Deletar</S.DeleteLabel>
        </TouchableOpacity>
      </S.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <S.Upload>
          <Photo uri={image} />

          <S.PickImageButton
            title="Carregar"
            type="secondary"
            onPress={handleImagePicker}
          />
        </S.Upload>

        <S.Form>
          <S.InputGroup>
            <S.Label>Nome</S.Label>
            <ControlledInput
              name="name"
              control={control}
              error={errors.name}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.InputGroupHeader>
              <S.Label>Descrição</S.Label>
              <S.MaxCharacters>0 de 60 caracteres</S.MaxCharacters>
            </S.InputGroupHeader>

            <ControlledInput
              control={control}
              name="description"
              multiline
              maxLength={60}
              style={{
                height: 80
              }}
              error={errors.description}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Tamanhos e preços</S.Label>

            <ControlledInputPrice
              size="P"
              control={control}
              name="sizeP"
              error={errors.sizeP}
            />
            <ControlledInputPrice
              size="M"
              control={control}
              name="sizeM"
              error={errors.sizeM}
            />
            <ControlledInputPrice
              size="G"
              control={control}
              name="sizeG"
              error={errors.sizeG}
            />
          </S.InputGroup>

          <Button
            title="Cadastrar Pizza"
            type="secondary"
            isLoading={isLoading}
            onPress={handleSubmit(handleAdd)}
          />
        </S.Form>
      </ScrollView>
    </S.Container>
  )
}
