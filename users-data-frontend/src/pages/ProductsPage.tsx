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

type FlexDirection = "row" | "column" | "column-reverse" | undefined;
type Product = 'codigo' | 'tipo_produto' | 'nome_produto' | 'valor_sugerido';

export function ProductsPage() {
	const [confirmScreen, setConfirmScreen] = useState(Boolean);
	const [allProducts, setAllProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [listOrderInverter, setListOrderInverter] = useState<FlexDirection>('column')
	const [svgRotate, setSvgRotate] = useState(
		{
			codigo: 'rotate(180deg)',
			tipo_produto: 'rotate(0deg)',
			nome_produto: 'rotate(0deg)',
			valor_sugerido: 'rotate(0deg)'
		});
	const [visible, setVisible] = useState(false);

	const navigate = useNavigate();
	const BASE_URL = api_url();

	useEffect(() => {
		const storage = localStorage.getItem('user');

		if (!storage) return navigate('/login');
		// const { token } = storage;

		if (JSON.parse(storage).token) {
			setConfirmScreen(false);
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
			.then(res => {
				setAllProducts(res), res.sort((x: ProductObject, y: ProductObject) => {
					let a = x.codigo!.toUpperCase();
					let b = y.codigo!.toUpperCase();

					return a == b ? 0 : a! > b! ? 1 : -1;
				}); setFilteredProducts(res);
			})
			.catch(err => console.log(err));
	};

	function resetSvgRotation() {
		setSvgRotate({
			codigo: 'rotate(0deg)',
			tipo_produto: 'rotate(0deg)',
			nome_produto: 'rotate(0deg)',
			valor_sugerido: 'rotate(0deg)'
		});
	}

	function setOrderedStates(orderedProducts: [] | never[], field: Product) {
		setFilteredProducts(orderedProducts);
		setListOrderInverter('column');
		resetSvgRotation();
		setSvgRotate(prevState => ({
			...prevState,
			[field]: 'rotate(180deg)'
		}));
	}

	function setRollOrder(event: any) {
		const field: Product = event.target.id;
		const filteredProductsAux = filteredProducts;

		if (svgRotate[field] === 'rotate(180deg)') {
			setListOrderInverter('column-reverse');
			resetSvgRotation();
		} else if (field === 'valor_sugerido') {

			filteredProductsAux.sort((x: any, y: any) => {
				let a: number = parseFloat(x[field]);
				let b: number = parseFloat(y[field]);

				return a - b;
			});
			setOrderedStates(filteredProductsAux, field);

		} else {

			filteredProductsAux.sort((x: any, y: any) => {
				let a = x[field].toUpperCase();
				let b = y[field].toUpperCase();

				return a == b ? 0 : a! > b! ? 1 : -1;
			});
			setOrderedStates(filteredProductsAux, field);

		}
		// https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a
	}

	function updateInputValue(event: any) {
		const value: any = event.target.value;
		const field: string = event.target.id;
		const filteredProductsAux: [] = [];

		allProducts.map(product => {
			const searchedTerm: string = product[field];
			if (searchedTerm?.toLowerCase().includes(value.toLowerCase())) {
				filteredProductsAux.push(product);
			}
		})
		setFilteredProducts(filteredProductsAux);
	}

	function handleScroll() {
		if (window.pageYOffset > 20) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}

	function handleClick() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	window.addEventListener("scroll", handleScroll);

	return (
		isAuthenticated ?
			<div style={{ fontFamily: 'monospace' }} className="ProductsPage" >
				{/* BARRA FIXA:  */}
				<div className="div-svg-btn-fixed">
					<svg cursor={'pointer'} onClick={() => { navigate('/newproduct') }} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
						<path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
					</svg>

					<svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/') }} viewBox="0 0 20 20">
						<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
					</svg>
				</div>
				{/*  BARRA DE BUSCA:  */}
				<div className="SearchBar" style={{ marginTop: '80px', display: 'block' }}>

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

				{/* CABEÇALHO DA LISTA:  */}
				<div className="product-card-roll-header" key={`product-roll-header`}>
					{/* <button onClick={evt => setRollOrder()}>Clique-me</button> */}
					<div className="product-card-roll-header-label" style={{ marginLeft: '24px' }}>
						Código
						<svg id="codigo" onClick={evt => setRollOrder(evt)} style={{ transform: svgRotate['codigo'] }} className="svg-icon svg-mini-button" viewBox="0 0 20 20">
							<path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
						</svg>
					</div>
					<div className="product-card-roll-header-label" style={{ marginLeft: '0px' }}>
						Tipo
						<svg id="tipo_produto" onClick={evt => setRollOrder(evt)} style={{ transform: svgRotate['tipo_produto'] }} className="svg-icon svg-mini-button" viewBox="0 0 20 20">
							<path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
						</svg>
					</div>
					<div className="product-card-roll-header-label" style={{ paddingLeft: '150px' }}>
						Nome do Produto
						<svg id="nome_produto" onClick={evt => setRollOrder(evt)} style={{ transform: svgRotate['nome_produto'] }} className="svg-icon svg-mini-button" viewBox="0 0 20 20">
							<path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
						</svg>
					</div>
					<div className="product-card-roll-header-label" style={{ paddingLeft: '40px' }}>
						Preço
						<svg id="valor_sugerido" onClick={evt => setRollOrder(evt)} style={{ transform: svgRotate['valor_sugerido'] }} className="svg-icon svg-mini-button" viewBox="0 0 20 20">
							<path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
						</svg>
					</div>
				</div>

				{/* ROLL DE CARDS DOS PRODUTOS POR GERÊNCIA:  */}
				<div className="product-card-roll" style={{ flexDirection: listOrderInverter }}>
					{filteredProducts.map((product, index) => {
						return (
							<div id={`${product['id']}`} className="product-card-style" key={`product-card-${product['id']}`}>
								{ProductCard(product, navigate)}
							</div>
						)
					})
					}
				</div>

				{/* RODAPÉ */}
				<div className="new-custommer-block">
					<div className="div-svg-btn">
						<svg
							cursor={'pointer'}
							onClick={handleClick}
							style={{ display: visible ? "block" : "none" }}
							className="svg-icon svg-nav-style btn-voltar-ao-topo"
							viewBox="0 0 20 20"
						>
							<path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>
						</svg>
					</div>
				</div>

			</div>
			: navigate('/login')
	) as any
}
