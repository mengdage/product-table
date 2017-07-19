import React, { Component } from 'react';
import './App.css';

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

function ProductCategoryRow(props) {
  render(props) {
    return (
      <tr>
        <th colSpan='2'>{props.category}</th>
      </tr>
    )
  }
}

function ProductRow(props) {
  render(props) {
    return (
      <tr>
        <td>{props.product.name}</td>
        <td>{props.product.price}</td>
      </tr>
    );
  }
}

class SearchBar extends Component {

  handleTextChange(e) {
    this.props.handleFilterContentChange(e.target.value);
  }

  handleCheckboxChange(e) {
    this.props.handleInStockOnlyChange(e.target.checked);
  }
  render() {
    return (
      <form className='search-bar'>
        <input type='text' onChange={(e) => this.handleTextChange(e)} value={this.props.filterContent} placeholder='Search...' className='search-input'/>
        <div>
          <input type='checkbox' onChange={(e) => this.handleCheckboxChange(e)} id='inStockOnly' checked={this.props.ifInStockOnly}/><label htmlFor='inStockOnly'>In Stock Only</label>
        </div>
      </form>
    );
  }
}

class ProductTable extends Component {
  render() {
    var rows = [],
        lastCategory='';
    const products = this.props.products.filter((product) => {
      if(product.name.indexOf(this.props.filterContent) === -1) {
        return false;
      }
      if(this.props.ifInStockOnly && !product.stocked) {
        return false;
      }
      return true;
    });
    products.forEach((product) => {
      if(product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow category={product.category} key={product.category}/>
        );
        lastCategory = product.category;
      }

      rows.push(
        <ProductRow product={product} key={product.name}/>
      );

    })
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterContent: '',
      ifInStockOnly: true
    }

    this.handleFilterContentChange = this.handleFilterContentChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }

  handleFilterContentChange(content) {
    this.setState({
      filterContent: content
    });
  }

  handleInStockOnlyChange(ifInStockOnly) {
    this.setState({
      ifInStockOnly: ifInStockOnly
    });
  }

  render() {
    return (
      <div className='filterable-product-table'>
        <SearchBar filterContent={this.state.filterContent}
          ifInStockOnly={this.state.ifInStockOnly}
          handleInStockOnlyChange={this.handleInStockOnlyChange}
          handleFilterContentChange = {this.handleFilterContentChange}/>
        <ProductTable filterContent={this.state.filterContent}
          ifInStockOnly={this.state.ifInStockOnly}
          products={PRODUCTS} />
      </div>
    );
  }
}

export default App;
