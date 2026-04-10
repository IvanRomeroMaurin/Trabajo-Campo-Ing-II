'use client'

import { useState } from 'react'
import Link from 'next/link'
import { register } from '../actions/register'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string

    try {
      const res = await register({ email, password, name, phone })
      if (res?.error) {
        setError(res.error)
      } else if (res?.success) {
        setSuccess(true)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-sm border-border text-center">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl font-light tracking-wide">Revisá tu email</CardTitle>
          <CardDescription className="text-xs tracking-wide text-muted-foreground">
            Te enviamos un enlace de confirmación para activar tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center pt-0">
          <Link href="/login" className="text-xs tracking-widest uppercase text-foreground hover:underline underline-offset-4">
            Volver a iniciar sesión
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm border-border">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-xl font-light tracking-wide">
            Crear cuenta
          </CardTitle>
          <CardDescription className="text-xs tracking-wide">
            Completá tus datos para registrarte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p className="text-xs text-destructive border border-destructive/20 bg-destructive/5 px-3 py-2">
              {error}
            </p>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs tracking-widest uppercase">
              Nombre
            </Label>
            <Input id="name" name="name" type="text" required placeholder="Juan Perez" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs tracking-widest uppercase">
              Teléfono
            </Label>
            <Input id="phone" name="phone" type="tel" required placeholder="+54 9 11 1234 5678" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs tracking-widest uppercase">
              Email
            </Label>
            <Input id="email" name="email" type="email" required placeholder="nombre@ejemplo.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs tracking-widest uppercase">
              Contraseña
            </Label>
            <Input id="password" name="password" type="password" required placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button
            type="submit"
            className="w-full text-xs tracking-widest uppercase font-light"
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="text-foreground hover:underline underline-offset-4">
              Iniciar sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  )
}
