import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { api_url } from '../../serverurl';
import { ProductCard } from "../components/ProductCard";

type ProductObject = {
	nome_produto?: string;
	tipo_produto?: string;
	valor_sugerido?: string;
	codigo?: string;
}

export function ProductsPage() {
	const [confirmScreen, setConfirmScreen] = useState(false);
	const [allProducts, setAllProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const navigate = useNavigate();
	const BASE_URL = api_url();

	useEffect(() => {
		const storage = localStorage.getItem('user');

		if (!storage) return navigate('/login');
		// const { token } = storage;

		if (JSON.parse(storage).token) {
			const token: string = JSON.parse(storage).token;
			console.log('token em Products: ', token);

			fetch(`${BASE_URL}/login/validate`, {
				method: "GET",
				headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Acept': '*/*' }
			})
				.then(response => response.json())
				.then(() => { setIsAuthenticated(true); fillProductsBySeller(JSON.parse(storage).id); })
				.catch(() => navigate('/login'));
		};

	}, [navigate]);

	function fillProductsBySeller(sellerId: number) {
		// TODO: `${BASE_URL}/products/${sellerId}`
		const fetchUrl: string = `${BASE_URL}/product`;
		fetch(fetchUrl)
			.then(response => response.json())
			.then(res => { setAllProducts(res), setFilteredProducts(res); })
			.catch(err => console.log(err));
	};


	function handleAddBtnClick() {

	}

	function cleanInputs() {

	}

	function updateInputValue(event: any) {
		const value: any = event.target.value;
		const field: string = event.target.id;
		console.log('updateInputValue', field, allProducts)
		const filteredProductsAux: [] = [];

		allProducts.map(product => {
			const searchedTerm: string = product[field];
			console.log('updateInputValue MAP', searchedTerm)
			if (searchedTerm?.toLowerCase().includes(value.toLowerCase())) {
				filteredProductsAux.push(product);
			}
		})

		setFilteredProducts(filteredProductsAux);
	}

	return (
		confirmScreen ?
			<div>
				<h1>Novo Cliente Cadastrado com Sucesso!</h1>
				<div className="div-svg-btn">
					<svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/') }} viewBox="0 0 20 20">
						<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
					</svg>

					<svg cursor={'pointer'} onClick={cleanInputs} className="svg-nav-style svg-icon" viewBox="0 0 20 20">
						<path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
					</svg>
				</div>
			</div>
			: isAuthenticated ?
				<div className="NewCustommerForm" >

					<h1 style={{ textAlign: 'center' }}>Arquivo de Produtos</h1>

					<div className="SearchBar" style={{ display: 'block' }}>

						<div style={{ display: 'flex' }}>
							<svg className="svg-big-style" viewBox="0 0 20 20">
								<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
							</svg>
							<h2>{`${filteredProducts.length === 0
								? 'Nenhum registro encontrado'
								: filteredProducts.length === allProducts.length
									? `Total de ${filteredProducts.length} produtos`
									: `Exibindo ${filteredProducts.length} produtos`}`}
							</h2>
						</div>
						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							<div style={{ paddingLeft: '5px' }}>
								<label className="form-label">Nome do Produto</label>
								<input className="form-input" type="text" size={18} id="nome_produto" onChange={evt => updateInputValue(evt)} />
							</div>
							<div style={{ paddingLeft: '5px' }}>
								<label className="form-label">Tipo</label>
								<input className="form-input" type="text" size={18} id="tipo_produto" onChange={evt => updateInputValue(evt)} />
							</div>
							<div style={{ paddingLeft: '5px' }}>
								<label className="form-label">Código</label>
								<input className="form-input" type="text" size={6} id="codigo" onChange={evt => updateInputValue(evt)} />
							</div>

						</div>
					</div>

					{/* ROLL DE CARDS DOS PRODUTOS POR GERÊNCIA:  */}
					<div className="custommer-card-roll">
						{filteredProducts.map((product, index) => {
							return (
								<div id={`${product['id']}`} className="custommer-card-style"  key={`product-card-${product['id']}`}>
									{ProductCard(product), navigate}
								</div>

								// <div>{product.nome_produto}</div>
								// <div id={`custommer['id']`} className="custommer-card-style" onClick={() => { handleToPrintQueue(custommer['id']); handleOnChange(index) }} key={`custummer-card-${custommer['id']}`}>
								// 	{CustommerCard(product, toPrintQueue, navigate)}
								// </div>
							)
						})
						}
					</div>

					<div className="new-custommer-block">
						<div className="custommer-form">


						</div>

						<div className="div-svg-btn">

							<svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/') }} viewBox="0 0 20 20">
								<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
							</svg>

							<svg cursor={'pointer'} onClick={handleAddBtnClick} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
								<path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
							</svg>

						</div>

					</div>

				</div>
				: navigate('/login')
	) as any
}
