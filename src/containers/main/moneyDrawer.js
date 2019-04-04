import React from 'react';
import { connect } from 'react-redux';
import actions from './moneyDrawer';
import Table from 'rc-table';
import 'rc-table/assets/index.css';

class MoneyDrawer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        isScrolling: false
    }
    this.listenScrollEvent = this.listenScrollEvent.bind(this);
  }
  listenScrollEvent = (ev) => {
    let timeout;
    this.setState({
        isScrolling: true
    }, () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            this.setState({
                isScrolling: false
            });
        }, 3000);
    });
  }
  render() {
    const {
        isScrolling
    } = this.state;
    const {
        stateDrawer
    } = this.props;
    const columns = [
        { title: 'Money', dataIndex: 'm', key: 'm', width: 100}
    ];
    let dataTable = [];
    for (let a = 0; a < stateDrawer.length; a++) {
        let rec = { m: stateDrawer[a].denom, q: stateDrawer[a].quantity};
        dataTable = [...dataTable, rec]
    }
    return (
        <div className="money-drawer-container" onScroll={this.listenScrollEvent.bind(this)}  title="scroll to view more data">
            {
                (!isScrolling) ?
                <div className="scrollable-vertical-icon visible" title="scroll to view more data"/>
                :
                <div className="scrollable-vertical-icon"/>
            }
            <Table
                columns={columns}
                data={dataTable}
                useFixedHeader={true}
                className="money-drawer-table"
                style={{ width: 320 }}
                scroll={{ x: 0, y: 105 }}
                rowKey={record => record.m}
            />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { moneyChange } = state
  return { ...moneyChange }
}

export default connect(mapStateToProps, actions)(MoneyDrawer)
