import { React } from 'uebersicht';

const API_KEY                 = ``;

export const className        = `
	bottom:        80px;
	left:          0;
	width:         50vw;
	margin:        1em;
	padding:       0.5em;
	font-weight:   500;
	font-family:   -apple-system, Verdana;
	color:         #fff;
	line-height:   1.875rem;
	text-align:    right;
	background:    rgba(9, 10, 13, 0.10);
	border-radius: .8rem;

	div.quote {
		display:         flex;
		flex-direction:  row;
		justify-content: space-between;

		blockquote {
			flex-grow:   9;
			text-align:  left;
			text-shadow: 0px 0px 2px rgba(0,0,0,0.30);

			&::before, &::after {
				content: '"';
			}
		}

		img {
			flex-grow:     1;
			width:         64px;
			height:        64px;
			border-radius: .4rem;
			box-shadow:    0 0 15px -5px #000;
		}
	}

	cite {
		text-shadow: 0px 0px 2px rgba(0,0,0,0.30);
	}
`;

const STATUS                  = {
	STARTUP: 'QOD/STARTUP',
	ACTIVE:  'QOD/ACTIVE',
};

export const command          = undefined;

export const refreshFrequency = false;

export const initialState     = { type: STATUS.STARTUP };

export const init             = (dispatch) => {
	$.get({
		url:     'http://127.0.0.1:41417/https://quotes.rest/qod/categories?language=en&detailed=false',
		headers: { 'X-Theysaidso-Api-Secret': API_KEY }
	}).then((response) => {
		const categories = Object.keys(response.contents.categories).map((key) => {
			return { name: key, description: response.contents.categories[key] };
		});

		update(categories, dispatch);
	}).catch(error => {
		dispatch({ error: error.message });
	});
}

export const updateState      = (event, previousState) => {
	if (event.error) {
		return { ...previousState, warning: `We got an error: ${event.error}` };
	}

	return { ...previousState, ...event };
}

export const render           = (props, dispatch) => {
	return (
		(STATUS.ACTIVE === props.type) ? (
			<React.Fragment>
				<div className = "quote">
					<blockquote cite = "https://quotes.rest/qod">
						{ props.output.quote }
					</blockquote>
					<img src = { props.output.background }/>
				</div>
				<cite>—{ props.output.author }</cite>
			</React.Fragment>
		) : ('')
	);
}

function update(categories, dispatch) {
	const category = getCategory(categories);

	$.get({
		url:     'http://127.0.0.1:41417/https://quotes.rest/qod?category=${category.name}&language=en',
		headers: { 'X-Theysaidso-Api-Secret': API_KEY }
	}).then((response) => {
		const quote = response.contents.quotes[0];

		dispatch({
			type:   STATUS.ACTIVE,
			output: {
				title:      quote.title,
				quote:      quote.quote,
				author:     quote.author,
				background: quote.background,
			},
		});
	}).catch(error => {
		dispatch({ error: error.message });
	});
}

function getCategory(categories) {
	return categories[Math.floor(Math.random() * (categories.length))];
}
