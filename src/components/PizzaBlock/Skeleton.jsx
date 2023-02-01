import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
	<ContentLoader
		speed={2}
		width={280}
		height={465}
		viewBox='0 0 280 465'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}>
		<circle cx='134' cy='136' r='125' />
		<rect x='0' y='287' rx='10' ry='10' width='280' height='21' />
		<rect x='-1' y='319' rx='10' ry='10' width='280' height='88' />
		<rect x='0' y='425' rx='10' ry='10' width='95' height='32' />
		<rect x='123' y='418' rx='25' ry='25' width='152' height='45' />
	</ContentLoader>
);

export default Skeleton;
