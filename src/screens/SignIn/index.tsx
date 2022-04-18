import React from 'react'

import { KeyboardAvoidingView, Platform } from 'react-native'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import brandImg from '@assets/brand.png'

import * as S from './style'

export function SignIn() {
  return (
    <S.Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <S.Content>
          <S.Brand source={brandImg} />

          <S.Title>Login</S.Title>
          <Input
            placeholder="Email"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <Input placeholder="Senha" type="secondary" secureTextEntry />

          <S.ForgotPasswordButton>
            <S.ForgotPasswordLabel>Esqueceu a senha?</S.ForgotPasswordLabel>
            <S.ForgotPasswordHelper>Clique Aqui</S.ForgotPasswordHelper>
          </S.ForgotPasswordButton>

          <Button type="secondary" title="Entrar" />
        </S.Content>
      </KeyboardAvoidingView>
    </S.Container>
  )
}
