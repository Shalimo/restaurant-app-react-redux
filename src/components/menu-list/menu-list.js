import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions'
import WithRestoService from '../hoc';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() {
        this.props.menuRequested();
        const {RestoService} = this.props;
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(() => this.props.menuError())
    }

    render() {
        const {menuItems, loading, error, addedToCart} = this.props;
        if (loading) {
            return <Spinner/>
        }

        if (error) {
            return<Error/>
        }

        return (
            <ul className="menu__list">
                {menuItems.map(menuItem => {
                    return (
                        <MenuListItem key={menuItem.id} menuItem={menuItem} onAddToCart={() => addedToCart(menuItem.id)}/>
                    )
                })}
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        menuLoaded: (newMenu) => {
            dispatch(menuLoaded(newMenu));
        },
        menuRequested: () => {
            dispatch(menuRequested());
        },
        menuError: () => {
            dispatch(menuError());
        },
        addedToCart: (id) => {
            dispatch(addedToCart(id));
        }
    }
}


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));