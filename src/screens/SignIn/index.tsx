import React, { useState } from 'react'

import { KeyboardAvoidingView, Platform } from 'react-native'

import { useAuth } from '@hooks/auth'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import brandImg from '@assets/brand.png'

import * as S from './style'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isLogging, signIn, forgotPassword } = useAuth()

  function handleSignIn() {
    signIn(email, password)
  }

  function handleForgotPassword() {
    forgotPassword(email)
  }

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
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <S.ForgotPasswordButton onPress={handleForgotPassword}>
            <S.ForgotPasswordLabel>Esqueceu a senha?</S.ForgotPasswordLabel>
            <S.ForgotPasswordHelper>Clique Aqui</S.ForgotPasswordHelper>
          </S.ForgotPasswordButton>

          <Button
            type="secondary"
            title="Entrar"
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </S.Content>
      </KeyboardAvoidingView>
    </S.Container>
  )
}
