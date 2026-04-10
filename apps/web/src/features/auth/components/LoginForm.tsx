'use client'

import { useState } from 'react'
import Link from 'next/link'
import { login } from '../actions/login'
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

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    const res = await login({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })
    if (res?.error) setError(res.error)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm border-border">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-xl font-light tracking-wide">
            Iniciar sesión
          </CardTitle>
          <CardDescription className="text-xs tracking-wide">
            Ingresá tus credenciales para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p className="text-xs text-destructive border border-destructive/20 bg-destructive/5 px-3 py-2">
              {error}
            </p>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs tracking-widest uppercase">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="nombre@ejemplo.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs tracking-widest uppercase">
              Contraseña
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button
            type="submit"
            className="w-full text-xs tracking-widest uppercase"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            ¿No tenés cuenta?{' '}
            <Link href="/register" className="text-foreground hover:underline underline-offset-4">
              Registrate
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  )
}
