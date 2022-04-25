import React, { ReactNode } from 'react'

import { Control, Controller, FieldError } from 'react-hook-form'
import { TextInputProps } from 'react-native'

import { InputPrice } from '@components/InputPrice'
import { Input } from '@components/Input'

import * as S from './styles'

type Props = TextInputProps & {
  control: Control<any>
  name: string
  error?: FieldError
}

type InputPriceProps = Props & {
  size: string
}

export function ControlledInput({ control, name, error, ...rest }: Props) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <S.Error>{error.message}</S.Error>}
    </>
  )
}

export function ControlledInputPrice({
  control,
  name,
  size,
  error,
  ...rest
}: InputPriceProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <InputPrice
            size={size}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            {...rest}
          />
        )}
      />
      {error && <S.Error>{error.message}</S.Error>}
    </>
  )
}
