import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { api_url } from '../../serverurl';
import MyComponent from "../components/modal/MyComponent";
import DialogProvider from "../components/modal/DialogProvider";

type ProductObject = {
	nome_produto?: string;
	tipo_produto?: string;
	valor_sugerido?: string;
	codigo?: string;
}


export function EditProduct() {
	const [confirmScreen, setConfirmScreen] = useState(false);
	const [editedProduct, setEditedProduct] = useState<ProductObject>();
	const [productId, setProductId] = useState(String);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const navigate = useNavigate();

	const BASE_URL = api_url();

	useEffect(() => {
		const storage = localStorage.getItem('user');

		if (!storage) return navigate('/login');
		// const { token } = storage;

		if (JSON.parse(storage).token) {
			const token: string = JSON.parse(storage).token;
			console.log('token em edit custommer: ', token);

			fetch(`${BASE_URL}/login/validate`, {
				method: "GET",
				headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Acept': '*/*' }
			})
				.then(response => response.json())
				.then(() => { setIsAuthenticated(true); renderCustommerForEdit(); })
				.catch(() => navigate('/login'));
		};

	}, [navigate]);

	function renderCustommerForEdit() {
		console.log('EditedCustomer: ', editedProduct);
		const params = new URLSearchParams(window.location.href);
		const len: number = window.location.href.length;
		const url: string = window.location.href;
		let productIdAux: string = '';
		const splited = url.split('');
		let sliced: string = url.slice(len - 1);
		productIdAux = productIdAux + sliced;
		sliced = url.slice(len - 2);
		if (!sliced.includes('/')) {
			productIdAux = sliced;
		}
		sliced = url.slice(len - 3);
		if (!sliced.includes('/')) {
			productIdAux = sliced;
		}
		sliced = url.slice(len - 4);
		if (!sliced.includes('/')) {
			productIdAux = sliced;
		}

		const productId = productIdAux;
		setProductId(productId);
		localStorage.setItem('product', JSON.stringify({ productId }));
		console.log('url extraída, com productIdAux: ', `${BASE_URL}/product/:${productIdAux}`);

		const fetchUrl = `${BASE_URL}/product/:${productIdAux}`;
		fetch(fetchUrl)
			.then(response => response.json())
			.then(res => setEditedProduct(res))
			.catch(err => console.log(err));
	};

	function updateInputValue(event: any) {
		console.log('editedProduct', editedProduct);
		let productAux: ProductObject = {};
		if (editedProduct != undefined) {
			productAux = editedProduct;
		}
		const value: any = event.target.value;
		const field: string = event.target.id;
		if ('nome_produto' == field || 'tipo_produto' == field ||
			'valor_sugerido' == field || 'codigo' == field) {
			productAux[field] = value;
			console.log('productAux Alterado', productAux);
		}

		setEditedProduct(productAux);
	}

	function handleUpdateBtnClick() {

		const url = `${BASE_URL}/product/update/${productId}`;
		console.log('em handleUpdateBtnClick:', editedProduct);
		fetch(url, {
			method: "PUT",
			headers: { 'Content-Type': 'application/json', 'Acept': '*/*' },
			body: JSON.stringify(editedProduct)
		})
			.then(res => {
				console.log(res);
				if (res.status == 200) {
					setConfirmScreen(true);
					setTimeout(() => {

						navigate('/products');
					}, 2000);
				}
			})
			.catch(err => console.log(err));
	};

	return (
		confirmScreen ?
			<h1>Muito bem! Produto Alterado com Sucesso...</h1>
			: isAuthenticated ?
				<div className="NewCustommerForm">

					<h1>{`Editar PRODUTO Nro.Registro: ${productId}`}</h1>

					<div className="new-custommer-block">
						{/*BOTÕES DE NAV => HOME | ADD | DELETE */}
						<div className="div-svg-btn">
							<svg cursor={'pointer'} onClick={handleUpdateBtnClick} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
								<path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path>
							</svg>
							
							<svg cursor={'pointer'} onClick={() => { navigate('/products') }} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
								<path d="M17.638,6.181h-3.844C13.581,4.273,11.963,2.786,10,2.786c-1.962,0-3.581,1.487-3.793,3.395H2.362c-0.233,0-0.424,0.191-0.424,0.424v10.184c0,0.232,0.191,0.424,0.424,0.424h15.276c0.234,0,0.425-0.191,0.425-0.424V6.605C18.062,6.372,17.872,6.181,17.638,6.181 M13.395,9.151c0.234,0,0.425,0.191,0.425,0.424S13.629,10,13.395,10c-0.232,0-0.424-0.191-0.424-0.424S13.162,9.151,13.395,9.151 M10,3.635c1.493,0,2.729,1.109,2.936,2.546H7.064C7.271,4.744,8.506,3.635,10,3.635 M6.605,9.151c0.233,0,0.424,0.191,0.424,0.424S6.838,10,6.605,10c-0.233,0-0.424-0.191-0.424-0.424S6.372,9.151,6.605,9.151 M17.214,16.365H2.786V7.029h3.395v1.347C5.687,8.552,5.332,9.021,5.332,9.575c0,0.703,0.571,1.273,1.273,1.273c0.702,0,1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h5.941v1.347c-0.495,0.176-0.849,0.645-0.849,1.199c0,0.703,0.57,1.273,1.272,1.273s1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h3.395V16.365z"></path>
							</svg>

							<svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/') }} viewBox="0 0 20 20">
								<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
							</svg>


							{/* COMPONENTE EXCLUIR */}
							{/* <DialogProvider>
								<MyComponent />
							</DialogProvider> */}
						</div>


						<div className="custommer-form">
							<div className="table-custommer-form">
								<h2 style={{ textAlign: 'left', paddingTop: '0px' }}>Descrição</h2>
								<label className="form-label">Nome do Produto</label>
								<input className="form-input" size={34} type="text" id="nome_produto" defaultValue={editedProduct?.nome_produto} onInput={evt => updateInputValue(evt)} />
								<label className="form-label">Tipo de Produto</label>
								<input size={34} className="form-input" type="text" id="tipo_produto" defaultValue={editedProduct?.tipo_produto} onInput={evt => updateInputValue(evt)} />

								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<div style={{ paddingLeft: '0px' }}>
										<label className="form-label">Código</label>
										<input size={16} className="form-input" type="text" id="codigo" defaultValue={editedProduct?.codigo} onInput={evt => updateInputValue(evt)} />
									</div>
									<div>
										<label className="form-label">Valor Sugerido</label>
										<input size={14} className="form-input" type="text" id="valor_sugerido" defaultValue={editedProduct?.valor_sugerido} onInput={evt => updateInputValue(evt)} />
									</div>
								</div>

							</div>

						</div>
					</div>
				</div>
				: navigate('/login')
	) as any
}
