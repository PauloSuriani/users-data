import React from "react";
import { DialogPropTypes } from "./types";
import WithDialog from "./WithDialog";
import { api_url } from '../../../serverurl';

class MyComponent extends React.Component<DialogPropTypes> {
  constructor(props:any){
    super(props);
    this.handleDialogOkClick = this.handleDialogOkClick.bind(this);
  }
  private handleDialogOkClick = () => {
    
    const storage = localStorage.getItem('custommer');
    if (!storage) return null;

    const custommerId:string = JSON.parse(storage).custommerId;
    const BASE_URL = api_url();
    const fetchUrl = `${BASE_URL}/delete/${custommerId}`;

    let urlSize:number = custommerId.length as number;
    urlSize += 15;

    let thisUrl: string = window.location.href;
    thisUrl = thisUrl.slice(0, -urlSize);
    // console.log('fetchUrl, custommerId', thisUrl, urlSize, fetchUrl,  custommerId, window.location.href);
    
    fetch(fetchUrl, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json', 'Acept': '*/*' }
    })
    .then(res => {
      console.log(res);
      if(res.status == 200){
        window.location.replace(thisUrl);
      }
    })
    .catch(err => console.log(err));

  };

  private handleDialogCancellClick = () => {
    this.props.closeDialog();
  };

  private handleButtonClick = () => {
    const component = <span style={{ fontFamily: 'monospace', fontSize: '14px'}}>
      Esta ação implica em apagar completamente o registro da base, de modo que os dados não poderão ser recuperados futuramente.
      </span>;
    this.props.openDialog({
      component,
      title: "Deseja mesmo Excluir?",
      okCallback: this.handleDialogOkClick,
      cancelCallback: this.handleDialogCancellClick,
      width: "md",
      okText: "Sim",
      cancelText: "Cancelar"
    });
  };

  render() {
    return (

        <svg cursor={'pointer'} onClick={this.handleButtonClick} className="svg-nav-style" viewBox="0 0 20 20">
            <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
        </svg>

    );
  }
}

export default WithDialog(MyComponent);