'use client'
import { FormProvider, useForm } from 'react-hook-form'

type FormValues = {
  code: string
  language: string
  money: string
  day: string
  site: string
  cycle: string
  way: string
  share: string
  tax: string
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const methods = useForm<FormValues>({
    mode: 'onChange',
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}