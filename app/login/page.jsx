import { redirect } from 'next/navigation'
import React from 'react'

export default function Login() {
    redirect('/auth/login')
}
