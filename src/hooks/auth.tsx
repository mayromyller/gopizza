import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect
} from 'react'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Alert } from 'react-native'

type User = {
  id: string
  name: string
  isAdmin: boolean
}

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  isLogging: boolean
  user: User | null
}

type AuthProviderProps = {
  children: ReactNode
}

const USER_COLLECTION = '@gopizza:users'

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLogging, setIsLogging] = useState(false)

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o Email e a Senha')
    }

    setIsLogging(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        firestore()
          .collection('users')
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { isAdmin, name } = profile.data() as User

            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin
              }

              await AsyncStorage.setItem(
                USER_COLLECTION,
                JSON.stringify(userData)
              )
              setUser(userData)
            }
          })
          .catch(() =>
            Alert.alert(
              'Login',
              'Não foi possível buscar os dados de perfil do usuário.'
            )
          )
      })
      .catch((error) => {
        const { code } = error

        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          return Alert.alert('Login', 'Email e/ou senha inválida')
        } else {
          return Alert.alert('Login', 'Não foi possível realizar o login')
        }
      })
      .finally(() => setIsLogging(false))
  }

  async function loadStorageData() {
    setIsLogging(true)

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION)

    if (storedUser) {
      const userData = JSON.parse(storedUser)
      console.log('userData: ', userData)
      setUser(userData)
    }

    setIsLogging(false)
  }

  async function signOut() {
    await auth().signOut()
    await AsyncStorage.removeItem(USER_COLLECTION)
    setUser(null)
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert(
        'Redefinir senha',
        'Informe um email para recuperar sua senha'
      )
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          'Redefinir senha',
          'Enviamos um link para recuperar senha no seu email'
        )
      )
      .catch(() =>
        Alert.alert(
          'Redefinir senha',
          'Não foi possível enviar o email para redefinir sua senha'
        )
      )
  }

  useEffect(() => {
    loadStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLogging,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
