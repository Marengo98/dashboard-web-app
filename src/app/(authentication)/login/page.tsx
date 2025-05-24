import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import LoginForm from '@/app/(authentication)/login/login'
import { SearchParams } from '@/types/next'
import { getDictionary } from '@/locales/dictionary'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth.config'

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { callbackUrl } = searchParams
  const dict = await getDictionary()
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }
  const getCallbackUrl = () => {
    if (!callbackUrl) {
      return '/' // Default redirect to home page
    }

    return callbackUrl.toString()
  }
 

  return (
    <Row className="justify-content-center align-items-center px-3">
      <Col lg={6}>
        <Row>
          <Col  className="bg-white dark:bg-dark border p-5">
            <div>
              <h1>{dict.login.title}</h1>
              <p className="text-black-50 dark:text-gray-500">{dict.login.description}</p>

              <LoginForm callbackUrl={getCallbackUrl()} />
            </div>
          </Col>
          
        </Row>
      </Col>
    </Row>
  )
}
