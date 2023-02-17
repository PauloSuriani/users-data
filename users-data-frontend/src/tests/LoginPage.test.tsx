import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LoginPage } from '../pages/LoginPage';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

describe('LoginPage', () => {
  it('deve mostrar mensagem de erro quando informações de login são inválidas', () => {
    const { getByText } = render(<LoginPage />);

    expect(getByText('Cadastro de Clientes')).toBeInTheDocument();
    expect(getByText('Informe os seus dados abaixo')).toBeInTheDocument();
  });

  it('deve atualizar o valor do email ao mudar o input', () => {
    const { getByPlaceholderText } = render(<LoginPage />);

    const emailInput = getByPlaceholderText('E-mail');
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });

    expect((emailInput as HTMLInputElement).value).toBe('test@email.com');
  });

  it('deve atualizar o valor da senha ao mudar o input', () => {
    const { getByPlaceholderText } = render(<LoginPage />);

    const passwordInput = getByPlaceholderText('Senha');
    fireEvent.change(passwordInput, { target: { value: 'test_password' } });

    expect((passwordInput as HTMLInputElement).value).toBe('test_password');
  });

  it('deve fazer o login ao pressionar enter no input da senha', () => {
    const navigate = jest.fn();
    jest.doMock('react-router-dom', () => ({
      useNavigate: jest.fn().mockReturnValue(navigate),
    }));

    const { getByPlaceholderText } = render(<LoginPage />);

    const passwordInput = getByPlaceholderText('Senha');
    fireEvent.change(passwordInput, { target: { value: 'test_password' } });
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 13 });

    expect(navigate).toHaveBeenCalledWith('/');
  });

}
// import React from 'react';
// import { render, fireEvent, act } from '@testing-library/react';
// import { LoginPage } from '../pages/LoginPage';

// function renderLoginPage() {
//     return render(<LoginPage/>);
//   }
  
//   test('renderizar corretamente a página Login', () => {
//     const { getByText } = renderLoginPage();
//     expect(getByText('Olá, visitante!')).toBeInTheDocument();
//   });

//   test('atualizar o valor do campo "e-mail"', () => {
//     const { getByPlaceholderText } = renderLoginPage();
//     const emailInput = getByPlaceholderText('E-mail');
//     act(() => {
//       fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
//     });
//     expect(emailInput.value).toBe('test@test.com');
//   });

//   test('atualizar o valor do campo "senha"', () => {
//     const { getByPlaceholderText } = renderLoginPage();
//     const passwordInput = getByPlaceholderText('Senha');
//     act(() => {
//       fireEvent.change(passwordInput, { target: { value: 'password' } });
//     });
//     expect(passwordInput.value).toBe('password');
//   });

//   test('exibir mensagem de erro', () => {
//     const { getByText } = renderLoginPage({
//       message: 'Login inválido'
//     });
//     expect(getByText('Login inválido')).toBeInTheDocument();
//   });