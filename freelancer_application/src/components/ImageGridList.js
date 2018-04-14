import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import {withStyles} from 'material-ui/styles';
import {GridList, GridListTile} from 'material-ui/GridList';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
/*
        background: theme.palette.background.paper,
*/
    },
    gridList: {
        width: 500,
        height: 450,
    },
    subheader: {
        width: '100%',
    },
};

class ImageGridList extends Component {
/*

    static propTypes = {
        images: PropTypes.array.isRequired
    };
*/

    render(){
        return (
            <div /*style={styles.root}*/>
                <GridList cellHeight={250} /*style={styles.gridList}*/ cols={10}>
                    {this.props.images.map(tile => (
                            <img src={'http://localhost:5000/'+tile.img} alt={'myimage'}/>
                    ))}
                </GridList>
            </div>
        );
    }


}

export default (ImageGridList);