import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  '/src/pages/CustommerForm.css';
import { api_url } from '../../serverurl';


type LoginObject = {
  email?: string;
  password?: string;
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [logged, setLogin] = useState(false);

// dotenv.config();

  
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = localStorage.getItem('user');

  //   if (!user) return setLogin(false);

  //   if (JSON.parse(user).token) return setLogin(true);
  // }, [logged, setLogin]);
  const BASE_URL = api_url();

  function handleAccessBtnClick() {
    const loginObj:LoginObject = {
      email,
      password,
    }
    // console.log('handleAccessBtnClick', loginObj.email, `${BASE_URL}/login`);
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Acept': '*/*' },
      body: JSON.stringify(loginObj)
    })
    .then(response => response.json())
    .then(res => {
      if(res.status == 200){
        const { token, user } = res.message;
        localStorage.setItem('user', JSON.stringify({ token, ...user }));
        navigate('/');
      } else {
        setMessage(res.message);
      }
    })
    .catch(err => console.log(err));
  }

  function updateInputValue(event:any) {
    const key:string = event.key;
    const value:string = event.target.value;
    const field:string = event.target.id;
    
    if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }

    if (key === 'Enter') {
      handleAccessBtnClick();
    }
  }
  
  return (
    // logged ? navigate('/') : 
    <div className="NewCustommerForm" >
    
      <div className="div-svg-btn-fixed">
        <h2 style={{fontFamily: 'monospace'}}>{ `
          ${message === '' 
          ? `Cadastro de Clientes`
          : message}`}
        </h2>
      </div>
      <div className="new-custommer-block padding-top-aux">
        <div className="custommer-form">
          <div className="table-custommer-form">
            <div>
              <div className="table-login-form">
                <div>
                  <h3 className="typewriter-tex2">Olá, visitante!</h3>
                  <h3 className="typewriter-text">{
                    message === '' 
                    ? `Informe os seus dados abaixo`
                    : message}
                  </h3>
                  {/* <h3 className="typewriter-text">Informe os seus dados abaixo</h3> */}
                </div>
                <svg  className="typewriter-svg" >
                  <image className="tag-image-svg" href="/typewriter-svgrepo-com.svg" />
                </svg>
              </div>
              <label className="form-label">E-mail</label>
              <input className="form-input-login" size={26} onKeyDown={evt => updateInputValue(evt)} type="text" value={email} id="email" onChange={ evt => updateInputValue(evt) }/> 
              <label className="form-label">Senha</label>
              <input size={26} onKeyDown={evt => updateInputValue(evt)} className="form-input-login" type="password" value={password} id="password"  onChange={ evt => updateInputValue(evt) }/> 
            </div>              
          </div>
            


        </div>
        
        <div className="div-svg-btn">

          <svg cursor={'pointer'} className="svg-nav-style" onClick={handleAccessBtnClick} viewBox="0 0 20 20">
							<path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
					</svg>

          {/* <svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/')}} viewBox="0 0 20 20">
						<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
					</svg>
          
          <svg cursor={'pointer'} onClick={handleAddBtnClick} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
            <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
          </svg> */}

        </div>

      </div>
    
    </div>
  )
}
    