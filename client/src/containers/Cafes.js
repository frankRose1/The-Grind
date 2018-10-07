import React, { Component } from 'react';
import axios from '../axios';
import styled from 'styled-components';
import Cafe from '../components/Cafe';
import Loading from '../components/UI/Loading';

const CafeGrid = styled.ul`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
`;


class Cafes extends Component {

  state = {
    cafes: [],
    loading: false,
    error: false
  }

  fetchCafes = () => {
    this.setState({loading: true});
    axios.get('/cafes')
      .then(res => {
        this.setState({cafes: res.data, loading: false});
      })
      .catch(err => {
        this.setState({error: err, loading: false});
      });
  };

  componentDidMount(){
    //make api call
    this.fetchCafes();
  }

  render() {
    let cafesContent = <div>test</div>;
    if (this.state.loading) {
      cafesContent = <Loading />
    } else if (this.state.error) {
      cafesContent = <p>Shoot! {this.state.error.message}</p>;
    } else {
      cafesContent = 
        <CafeGrid>
          {this.state.cafes.map(cafe => (
            <Cafe cafe={ {name: 'coffee shop'}}/>
          ))}
        </CafeGrid>
      ;
    }

    return (
      <div>
        {cafesContent}
      </div>
    );
  }
}

export default Cafes;