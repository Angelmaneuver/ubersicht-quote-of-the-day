import { React } from 'uebersicht';

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
	fetch(
		'https://quotes.rest/qod/categories?language=en&detailed=false'
	).then((response) => response.json()
	).then((data) => {
		const categories = Object.keys(data.contents.categories).map((key) => {
			return { name: key, description: data.contents.categories[key] };
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

	fetch(
		`https://quotes.rest/qod?category=${category.name}&language=en`
	).then((response) => response.json()
	).then((data) => {
		const quote = data.contents.quotes[0];

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
