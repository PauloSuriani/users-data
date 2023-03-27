import { useNavigate } from 'react-router-dom';

type CustommerProps = {
  id: number;
  contato?: string;
  razao_social?: string;
  nome_fantasia?: string;
  rua?: string;
  nro?: string;
  bairro?: string;
  telefone?: string;
  cnpj?: string;
  email?: string;
  cidade?: string;
  uf?: string;
}

export function ShortCustommerCard(
  props: CustommerProps,
  toPrintQueue: Number[],
  navigate: any,
) {

  // const navigate = useNavigate();

  return (
    <div className="">
      {/* CAIXA DOS SVG */}
      <div className=''>
        <div className='grow-try'>

          <input type="radio" checked={toPrintQueue.includes(props['id'])} />


          <div className="div-svg-custommer-card-sm-combo" style={{paddingLeft: '6px'}}>
            <svg className="svg-custommer-card" viewBox="0 0 20 20">
              <path d="M4.317,16.411c-1.423-1.423-1.423-3.737,0-5.16l8.075-7.984c0.994-0.996,2.613-0.996,3.611,0.001C17,4.264,17,5.884,16.004,6.88l-8.075,7.984c-0.568,0.568-1.493,0.569-2.063-0.001c-0.569-0.569-0.569-1.495,0-2.064L9.93,8.828c0.145-0.141,0.376-0.139,0.517,0.005c0.141,0.144,0.139,0.375-0.006,0.516l-4.062,3.968c-0.282,0.282-0.282,0.745,0.003,1.03c0.285,0.284,0.747,0.284,1.032,0l8.074-7.985c0.711-0.71,0.711-1.868-0.002-2.579c-0.711-0.712-1.867-0.712-2.58,0l-8.074,7.984c-1.137,1.137-1.137,2.988,0.001,4.127c1.14,1.14,2.989,1.14,4.129,0l6.989-6.896c0.143-0.142,0.375-0.14,0.516,0.003c0.143,0.143,0.141,0.374-0.002,0.516l-6.988,6.895C8.054,17.836,5.743,17.836,4.317,16.411"></path>
            </svg>
            <div style={{ fontFamily: 'monospace', paddingLeft: '5px', fontSize: '14px', textAlign: 'center' }}>{props.id}</div>
          </div>

          <div className="div-svg-custommer-card-sm-combo" style={{paddingLeft: '10px'}}>
            <svg className="svg-custommer-card" viewBox="0 0 20 20">
              <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
            </svg>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', paddingLeft: '6px' }}>{props.contato}</div>
          </div>

          <div className="div-svg-custommer-card-sm-combo" style={{paddingLeft: '10px'}}>
            <svg className="svg-custommer-card" viewBox="0 0 20 20">
              <path d="M17.592,8.936l-6.531-6.534c-0.593-0.631-0.751-0.245-0.751,0.056l0.002,2.999L5.427,9.075H2.491c-0.839,0-0.162,0.901-0.311,0.752l3.683,3.678l-3.081,3.108c-0.17,0.171-0.17,0.449,0,0.62c0.169,0.17,0.448,0.17,0.618,0l3.098-3.093l3.675,3.685c-0.099-0.099,0.773,0.474,0.773-0.296v-2.965l3.601-4.872l2.734-0.005C17.73,9.688,18.326,9.669,17.592,8.936 M3.534,9.904h1.906l4.659,4.66v1.906L3.534,9.904z M10.522,13.717L6.287,9.48l4.325-3.124l3.088,3.124L10.522,13.717z M14.335,8.845l-3.177-3.177V3.762l5.083,5.083H14.335z"></path>
            </svg>
            <div style={{ display: 'flex', fontWeight: '' }}>
              <div style={{ fontFamily: 'monospace', paddingInline: '5px', fontSize: '14px' }}>{props.cidade}</div>
              <span>{` - `}</span>
              <div style={{ fontFamily: 'monospace', fontSize: '14px', paddingInline: '5px' }}>{props.uf}</div>
            </div>
          </div>

          <div className="div-svg-custommer-card-sm-combo" style={{paddingInline: '8px'}}>
            <svg className="svg-custommer-card" viewBox="0 0 20 20">
              <path d="M17.283,5.549h-5.26V4.335c0-0.222-0.183-0.404-0.404-0.404H8.381c-0.222,0-0.404,0.182-0.404,0.404v1.214h-5.26c-0.223,0-0.405,0.182-0.405,0.405v9.71c0,0.223,0.182,0.405,0.405,0.405h14.566c0.223,0,0.404-0.183,0.404-0.405v-9.71C17.688,5.731,17.506,5.549,17.283,5.549 M8.786,4.74h2.428v0.809H8.786V4.74z M16.879,15.26H3.122v-4.046h5.665v1.201c0,0.223,0.182,0.404,0.405,0.404h1.618c0.222,0,0.405-0.182,0.405-0.404v-1.201h5.665V15.26z M9.595,9.583h0.81v2.428h-0.81V9.583zM16.879,10.405h-5.665V9.19c0-0.222-0.183-0.405-0.405-0.405H9.191c-0.223,0-0.405,0.183-0.405,0.405v1.215H3.122V6.358h13.757V10.405z"></path>
            </svg>
            <div style={{ fontFamily: 'monospace', paddingLeft: '8px', fontSize: '14px' }}>{props.nome_fantasia}</div>

          </div>



          </div>
        </div>




    </div>
  )
}
