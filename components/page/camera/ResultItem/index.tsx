'use client'

import classNames from 'classnames'
import s from './style.module.scss'
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import Icon from '@/components/ui/Icon'
import { IconName } from '@/components/ui/Icon/shared'

type CameraConfirmResultItemProps = {
  file: File
  selected: Array<string>
  setSelected: Dispatch<SetStateAction<Array<string>>>
}
export default function CameraConfirmResultItem(props: CameraConfirmResultItemProps) {
  const isSelected = useMemo(() => props.selected.includes(props.file.name), [props.selected])
  const sourceSrc = useMemo(() => URL.createObjectURL(props.file), [props.file])

  const onClick = useCallback(() => {
    props.setSelected(prev => {
      if (prev.includes(props.file.name)) {
        return prev.filter(name => name !== props.file.name)
      }

      return [...prev, props.file.name]
    })
  }, [])

  return <>
    <div
      className={s.item}
      onClick={onClick}
    >
      {
        props.file.type.startsWith('image/') ?
          <img src={sourceSrc} alt={props.file.name} /> :
          <video src={sourceSrc} controls={false} muted autoPlay loop />
      }
      <div className={classNames(s.overlay, { [s.selected]: isSelected })}>
        <Icon icon={IconName.CheckCircle} fill />
      </div>
    </div>
  </>
}
