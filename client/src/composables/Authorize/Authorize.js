import React, { useRef, useState } from 'react'

import Icon from '../../components/Icon'

import {
    HeaderH1
} from '../../styles/typography.style'

import {
    LoginWrapper,
    LoginModal,
    ModalHolder,
    Header,
    CloseBar,
    Content,
    Title,
    HelpText,
    InputRow,
    InputLabel,
    Input,
    Checkbox,
    LoginButton,
    Footer,
    Link,
} from './Authorize.styled';

const Authorize = ({
    state,
    authorize,
    triggerModal,
    authorization,
}) => {
    const $login = useRef(null)
    const $password = useRef(null)
    const $remember = useRef(null)
    const $modals = useRef(null)
    const $email = useRef(null)
    const [step, setStep] = useState('login');

    const changeStep = step => () => {
        setStep(step)
    }

    const reset = () => {
        authorizeResetUi();
        setStep('login')
    }

    if (authorization.passwordReseted && step === 'forgot') {
        setStep('forgotSuccess')
    }
    const closeModal = e => {
        if (!$modals.current.contains(e.target)) {
            triggerModal({
                name: 'adminIsOpen',
                state: false,
            })
        }
    }
    const hideModal = () => {
        triggerModal({
            name: 'adminIsOpen',
            state: false,
        })
    }
    const Login = (
        <LoginModal ref={$modals} visibles={state}>
            <ModalHolder>
                <HeaderH1 mt="55" mb="40">
                    Вход
                </HeaderH1>

                <form onSubmit={authorize({
                    username: $login,
                    password: $password,
                    remember: $remember
                })}>
                    <InputRow marginBottom="48.38">
                        <Input ref={$login} type="text" required="required" autoFocus id="login" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" name="email" defaultValue="" />
                        <InputLabel htmlFor="login">
                            Логин
                        </InputLabel>
                    </InputRow>
                    <InputRow marginBottom="40.62">
                        <Input ref={$password} type="password" required="required" id="password" defaultValue="" />
                        <InputLabel htmlFor="password">
                            Пароль
                        </InputLabel>
                    </InputRow>

                    <InputRow marginBottom="40">
                        <Checkbox type="checkbox" id="checkbox-remember-me" ref={$remember} />
                        <label htmlFor="checkbox-remember-me">Запомнить меня</label>
                    </InputRow>

                    <Footer top="40" bottom="67.79">
                        <LoginButton type="submit" onClick={hideModal}>
                            Войти
                        </LoginButton>

                        <Link onClick={changeStep('forgot')}>Забыли пароль?</Link>
                    </Footer>
                </form>
            </ModalHolder>
        </LoginModal>
    )

    const Forgot = (
        <LoginModal ref={$modals} visibles={state}>
            <Header>
                <CloseBar onClick={changeStep('login')}>
                    <Icon name="close" />
                </CloseBar>
            </Header>
            <ModalHolder>
                <Content top="96.5" bottom="95.5">
                    <Title>
                        Забыли пароль?
                    </Title>
                    <HelpText>
                        Введите ваш email, на него придёт ссылка для востановления пароля.
                </HelpText>
                </Content>
                <form onSubmit={askForResetPasswordEmail({
                    email: $email
                })}>
                    <InputRow marginBottom="48.38">
                        <Input ref={$email} type="email" required="required" autoFocus id="email" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" name="email" defaultValue="" />
                        <InputLabel htmlFor="email">
                            Email
                        </InputLabel>
                    </InputRow>
                    <Footer top="70" bottom="114.5">
                        <LoginButton type="submit">
                            Отправить
                  </LoginButton>
                    </Footer>
                </form>
            </ModalHolder>
        </LoginModal>
    )

    const ForgotSuccess = (
        <LoginModal ref={$modals} visibles={state}>
            <Header>
                <CloseBar onClick={reset}>
                    <Icon name="close" />
                </CloseBar>
            </Header>
            <ModalHolder>
                <Content top="96.5" bottom="25">
                    <Title>
                        Check your email
              </Title>
                    <HelpText>
                        We've sent you instructions to reset your passwords.
              </HelpText>
                </Content>
                <Footer top="25" bottom="114.5">
                    <LoginButton type="button" onClick={reset}>
                        Ok
              </LoginButton>
                </Footer>
            </ModalHolder>
        </LoginModal>
    )

    const Window = () => {
        switch (step) {
            case 'login':
                return Login
            case 'forgot':
                return Forgot
            case 'forgotSuccess':
                return ForgotSuccess
            default:
                return Login
        }
    }

    return (
        <LoginWrapper visibles={state} onClick={closeModal}>
            {Window()}
        </LoginWrapper>
    )
}

export default Authorize