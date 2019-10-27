import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';


import ProductCard from './product-card';
import { styles } from './styles';

export default compose(withStyles(styles))(ProductCard);