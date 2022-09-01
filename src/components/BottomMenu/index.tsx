import React from 'react'

import * as S from './style'

type Props = {
  title: string
  color: string
  notifications?: string | undefined
}

export function BottomMenu({ title, color, notifications }: Props) {
  const noNotifications = notifications === '0'

  return (
    <S.Container>
      <S.Title color={color}>{title}</S.Title>

      {notifications && (
        <S.Notification noNotification={noNotifications}>
          <S.Quantity noNotification={noNotifications}>
            {notifications}
          </S.Quantity>
        </S.Notification>
      )}
    </S.Container>
  )
}
