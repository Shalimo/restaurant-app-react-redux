import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import { connect } from 'react-redux';
import {addedToCart} from '../../actions'
import './app-header.scss';

const AppHeader = ({count}) => {

    // addedToCart();
    
    return (
        <header className="header">
            <a className="header__link" href="#">
                Menu
            </a>
            <a className="header__link" href="#">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {count}
            </a>
        </header>
    )
};

const mapStateToProps = (state) => {
    return {
        count: state.countCards
    }
}

const mapActionToProps = (dispatch) => {
    return {
        countOfCards: () => {
            dispatch(addedToCart());
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(AppHeader);