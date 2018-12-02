import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
// import FieldValue from 'gureact/formik/FieldValue'
// import { List, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile'
import { auth } from '@/states'
import { Formik, Form } from 'formik'
import { RouteComponentProps } from 'react-router-dom'

interface Props {
  login: Function
}

@observer
class LoginComponent extends React.Component<Props & RouteComponentProps<{}>> {
  initialValues = {
    username: '',
    password: '',
  }

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.onSubmit}
        render={formik => {
          const { handleSubmit, isSubmitting, errors, touched } = formik
          return (
            <Root className="Login-main">
              <Form className="Login-form">
                <div>Login</div>
                {/* <List> */}
                {/* <FieldValue name="username" placeholder="用户名" component={InputItem} /> */}
                {/* <FieldValue name="password" placeholder="密码" component={InputItem} type="password" /> */}
                {/* </List> */}
                {/* <WhiteSpace size="xl" /> */}
                {/* <Button type="primary" loading={isSubmitting} onClick={handleSubmit}> */}
                {/* 登入 */}
                {/* </Button> */}
              </Form>
            </Root>
          )
        }}
      />
    )
  }

  onSubmit = async (values, actions) => {
    const { history } = this.props
    const res = await this.props.login(values).catch(err => ({ err }))
    actions.setSubmitting(false)
    auth.login(res)
    if (res.err) {
      // Toast.fail(res.err.message)
    } else {
      history.push('/')
    }
  }
}

const Root = styled.div`
  .Login-main {
    display: flex;
    align-items: center;
    padding: 0 20px;
    min-height: 100vh;
  }

  .Login-form {
    width: 100%;
  }
`

export default LoginComponent
