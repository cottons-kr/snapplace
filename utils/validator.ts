/*
HTML name attribute에 prefix를 추가하여 value의 type을 설정할 수 있다.

- prefix가 없는 경우: string으로 처리된다.
- prefix가 있는 경우: prefix에 따라 type이 결정된다.
  - !s   (string):     string
  - !n   (number):     number
  - !sb  (boolean):    boolean (true, false)
  - !nb  (boolean):    boolean (1, 0)
  - !ob  (boolean):    boolean (on, off)
  - !d   (date):       Date
  - !j   (json):       JSON
  - !fl  (file list):  Array<File>

예)
!s_name은 무조건 string이다.
!n_age는 무조건 number이다.
!b_isAdult는 무조건 boolean이다.
!d_birthday는 무조건 Date이다.

prefix는 parsing 시에 제거된다.
*/

import { ZodObject, z } from 'zod'
import type { ZodRawShape, ZodTypeAny } from 'zod'

export const enum Prefix {
  String = 's',
  Number = 'n',
  StrictBoolean = 'sb',
  NumberBoolean = 'nb',
  OnOffBoolean = 'ob',
  Date = 'd',
  JSON = 'j',
  FileList = 'fl',
  None = '',
}

export const zodKeys = <T extends z.ZodTypeAny>(schema: T): string[] => {
  if (schema === null || schema === undefined) return []
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) return zodKeys(schema.unwrap())
  if (schema instanceof z.ZodArray) return zodKeys(schema.element)
  if (schema instanceof z.ZodObject) {
    const entries = Object.entries(schema.shape)
    return entries.flatMap(([key, value]) => {
      const nested = value instanceof z.ZodType ? zodKeys(value).map(subKey => `${key}.${subKey}`) : []
      return nested.length ? nested : key
    })
  }
  return []
}

export function getPrefix(key: string) {
  const underlineIndex = key.indexOf('_')
  return underlineIndex === -1 ? Prefix.None : key.slice(1, underlineIndex) as Prefix
}

export function removePrefix(key: string) {
  const underlineIndex = key.indexOf('_')
  return underlineIndex === -1 ? key : key.slice(underlineIndex + 1)
}

export function parseFormData(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const keys = Object.keys(data)

  type RecordValue = string | number | boolean | File | Date
  const result: Record<string, RecordValue | Array<RecordValue>> = {}

  for (const key of keys) {
    const values = formData.getAll(key)
    const prefix = getPrefix(key)
    const realKey = removePrefix(key)

    if (values.length > 1 || prefix === Prefix.FileList) {
      const value = values.map(v => parseValue(v, prefix)).filter(v => v !== undefined && !isEmptyFile(v))
      if (value.length > 0) {
        result[realKey] = value
      }
    } else {
      const parsedValue = parseValue(values[0], prefix)
      if (parsedValue !== undefined && !isEmptyFile(parsedValue)) {
        result[realKey] = parsedValue
      }
    }
  }

  return result
}

export function isEmptyFile(value: unknown): boolean {
  return (
    value instanceof File &&
    value.size === 0
  )
}

export function parseValue(value: FormDataEntryValue, prefix: Prefix) {
  switch (prefix) {
    case Prefix.String: return value === '' ? undefined : String(value)
    case Prefix.Number: return value === '' ? undefined : Number(value)
    case Prefix.StrictBoolean: return value === 'true' ? true : value === 'false' ? false : undefined
    case Prefix.NumberBoolean: return value === '1' ? true : value === '0' ? false : undefined
    case Prefix.OnOffBoolean: return value === 'on' ? true : value === 'off' ? false : undefined
    case Prefix.Date: return value === '' ? undefined : new Date(String(value))
    case Prefix.JSON: return value === '' ? undefined : JSON.parse(String(value))
    default: return value
  }
}

export function isValidData<T extends object>(data: unknown, schema: ZodObject<ZodRawShape, 'strip', ZodTypeAny, T>): data is T {
  const result = schema.safeParse(data)
  if (!result.success) {
    console.error(result.error.errors)
    throw new Error(result.error.errors.map(e => e.message).join(', '))
  }
  return true
}

export function validateFormDataAndParse<T extends object>(formData: FormData, schema: ZodObject<ZodRawShape, 'strip', ZodTypeAny, T>): T {
  const data = parseFormData(formData)
  const keys = zodKeys(schema)
  if (isValidData(data, schema)) {
    return keys.reduce((acc, key) => {
      const value = data[key]
      const fieldSchema = schema.shape[key]
      
      if (fieldSchema instanceof z.ZodOptional && (value === null || value === undefined)) {
        return acc
      }
      
      return { ...acc, [key]: value }
    }, {} as T)
  } else {
    throw new Error('Invalid data')
  }
}

export function typedName<T>(name: keyof T, prefix: Prefix = Prefix.String) {
  return `!${prefix}_${String(name)}` as const
}

export function dataToFormData<T extends Record<string, unknown>>(data: T): FormData {
  const formData = new FormData()
  for (const [key, value] of Object.entries(data)) {
    const prefix = getPrefix(key)

    if (value === undefined || value === null) continue

    if (prefix === Prefix.JSON) {
      formData.append(key, JSON.stringify(value))
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString())
    } else if (Array.isArray(value)) {
      for (const item of value) {
        formData.append(key, item)
      }
    } else if (value instanceof File) {
      formData.append(key, value)
    } else if (typeof value === 'boolean') {
      formData.append(key, value.toString())
    } else {
      formData.append(key, String(value))
    }
  }
  return formData
}

type PrefixedKey<K extends string, P extends Prefix> = `!${P}_${K}`

type InferPrefixResult<T> = {
  [K in keyof T as T[K] extends File
    ? K
    : PrefixedKey<string & K, InferPrefixType<T[K]>>]: T[K]
}

type InferPrefixType<T> =
  T extends string ? Prefix.String :
  T extends number ? Prefix.Number :
  T extends boolean ? Prefix.StrictBoolean :
  T extends Date ? Prefix.Date :
  T extends File[] ? Prefix.FileList :
  T extends object ? Prefix.JSON :
  Prefix.String

export function inferPrefix<T extends Record<string, unknown>>(obj: T): InferPrefixResult<T> {
  const result = {} as InferPrefixResult<T>

  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof File) {
      result[key as keyof InferPrefixResult<T>] = value as InferPrefixResult<T>[keyof InferPrefixResult<T>]
    } else {
      const prefix = inferPrefixType(value)
      const newKey = `!${prefix}_${key}` as keyof InferPrefixResult<T>
      result[newKey as keyof InferPrefixResult<T>] = value as InferPrefixResult<T>[keyof InferPrefixResult<T>]
    }
  }

  return result
}

export function inferPrefixType(value: unknown): Prefix {
  if (typeof value === 'string') return Prefix.String
  if (typeof value === 'number') return Prefix.Number
  if (typeof value === 'boolean') return Prefix.StrictBoolean
  if (value instanceof Date) return Prefix.Date
  if (value instanceof File) return Prefix.None
  if (isJSONEncodable(value)) return Prefix.JSON
  if (Array.isArray(value) && value.every(item => item instanceof File)) return Prefix.FileList
  return Prefix.String
}

export function isJSONEncodable(value: unknown): boolean {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value instanceof Date
  ) {
    return false
  }

  if (value instanceof File) {
    return false
  }

  if (Array.isArray(value)) {
    const containsFile = value.some(item => item instanceof File)
    const containsOther = value.some(item => !(item instanceof File))
    
    if (containsFile && containsOther) {
      throw new Error('Array contains mixed types with File objects')
    }
    
    return !containsFile
  }

  if (typeof value === 'object') {
    const values = Object.values(value)
    const containsFile = values.some(item => item instanceof File)
    return !containsFile
  }

  return false
}
