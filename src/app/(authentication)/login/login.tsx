'use client'

import {
  Alert, Button, Col, Form, FormControl, InputGroup, Row,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'
import InputGroupText from 'react-bootstrap/InputGroupText'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useDictionary from '@/locales/dictionary-hook'

export default function Login({ callbackUrl }: { callbackUrl: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const dict = useDictionary()

  const login = async (formData: FormData) => {
    setSubmitting(true);  
    try {
      const res = await signIn('credentials', {
        redirect: false,
        callbackUrl: '/', // o una pagina personalizzata
        identifier: formData.get('username'), // per Strapi serve "identifier"
        password: formData.get('password'),
      });
  
      if (!res || !res.ok) {
        setError(res?.error || 'Login fallito');
        return;
      }
  
      // reindirizza solo se callbackUrl presente
      if (res.url) {
        router.push(res.url);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Errore sconosciuto');
      }
    } finally {
      setSubmitting(false);
    }
  };
  
  
return (
  <>
    <Alert
      variant="danger"
      show={error !== ''}
      onClose={() => setError('')}
      dismissible
    >
      {error}
    </Alert>
    <Form action={login}>
      <InputGroup className="mb-3">
        <InputGroupText>
          <FontAwesomeIcon
            icon={faUser}
            fixedWidth
          />
        </InputGroupText>
        <FormControl
          name="username"
          required
          disabled={submitting}
          placeholder={dict.login.form.username}
          aria-label="Username"
          defaultValue=""
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroupText>
          <FontAwesomeIcon
            icon={faLock}
            fixedWidth
          />
        </InputGroupText>
        <FormControl
          type="password"
          name="password"
          required
          disabled={submitting}
          placeholder={dict.login.form.password}
          aria-label="Password"
          defaultValue=""
        />
      </InputGroup>

      <Row className="align-items-center">
        <Col xs={6}>
          <Button
            className="px-4"
            variant="primary"
            type="submit"
            disabled={submitting}
          >
            {dict.login.form.submit}
          </Button>
        </Col>
        {/* <Col xs={6} className="text-end">
          <Link className="px-0" href="#">
            {dict.login.forgot_password}
          </Link>
        </Col> */}
      </Row>
    </Form>
  </>
)
}
