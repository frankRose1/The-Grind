import React, { Component } from 'react';
import Form from '../components/styles/FormStyles';
import axios from '../axios';

class CreateCafe extends Component {
  state = {
    loading: false,
    imageUploading: false,
    error: false,
    formIsValid: false,
    name: '',
    image: '',
    largeImage: '',
    description: '',
    address: '',
    lat: '',
    lng: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading: true});
    const data = {
      name: this.state.name,
      image: this.state.image,
      largeImage: this.state.largeImage,
      description: this.state.description,
      'location[address]': this.state.address,
      'location[coordinates][0]': this.state.lng,
      'location[coordinates][1]': this.state.lat
    };
    axios.post('/cafes', data)
      .then(res => {
        console.log(res);
        this.setState({
          loading: false,
          name: '',
          image: '',
          largeImage: '',
          description: '',
          address: '',
          lat: '',
          lng: ''
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({error: true, loading: false});
      });
  };

  addToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  uploadFile = async  e => {
    this.setState({imageUploading: true});
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'thegrind');
    const res = await fetch('https://api.cloudinary.com/v1_1/dbviuyhby/image/upload/', {method: 'POST', body: data});
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      imageUploading: false
    });
  };

  /**
   * @param {string} value - e.target.value of the form input
   * @param {object} rules - "validation" object in the form elemen config in state
   */
  checkValidity = (value, rules) => {
    if (!rules) return true; //some elements will not have a validation(rules) key
    let isValid = true;
    //will only be valid if the rule is satisfied and isValid is already set to true(will matter if more rules are incorporated)
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  };

  render() {

    return (
      <Form method="post" onSubmit={this.handleSubmit}>
        <h2>Tell Us About Your Awesome Cafe</h2>
          <fieldset disabled={this.state.loading || this.state.imageUploading} aria-busy={this.state.loading || this.state.imageUploading}>
            <div>
              <label htmlFor="file">
                <input 
                  type="file" 
                  name="image" 
                  placeholder="Upload an Image!" 
                  onChange={this.uploadFile} 
                  required/>
                {this.state.image && <img width="200" src={this.state.image} alt="Upload Preview" />}
              </label>
            </div>
            <div>
              <label htmlFor="name">
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  value={this.state.name} 
                  placeholder="Cafe Name" 
                  onChange={this.addToState} 
                  required/>
              </label>
            </div>
            <div>
              <label htmlFor="description">
                <textarea 
                  name="description" 
                  id="description"
                  value={this.state.description} 
                  placeholder="Tell the world what makes your Cafe unique" 
                  onChange={this.addToState} 
                  required/>
              </label>
            </div>
            <div>
              <label htmlFor="address">
                <input 
                  type="text"
                  name="address" 
                  id="address"
                  value={this.state.address} 
                  placeholder="Address" 
                  onChange={this.addToState} 
                  required/>
              </label>
            </div>
            <div>
              <label htmlFor="lat">
                <input 
                  type="text"
                  name="lat" 
                  id="lat"
                  value={this.state.lat} 
                  placeholder="Latitude" 
                  onChange={this.addToState} 
                  required/>
              </label>
            </div>
            <div>
              <label htmlFor="lng">
                <input
                  type="text"
                  name="lng" 
                  id="lng"
                  value={this.state.lng} 
                  placeholder="Longitude" 
                  onChange={this.addToState} 
                  required/>
              </label>
            </div>
            <button type="submit" disabled={this.state.loading || this.state.imageUploading}>Create Cafe!</button>
          </fieldset>
      </Form>
    );
  }
}

export default CreateCafe;