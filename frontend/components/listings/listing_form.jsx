import React from 'react';
import { withRouter } from 'react-router-dom';

class ListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.updateWarning = this.updateWarning.bind(this);
    this.state = this.props.Listing;
    this.errors = this.props.errors;
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.Listing.id != nextProps.match.params.id) {
      this.props.fetchListing(nextProps.match.params.id);
    }
  }

  updateWarning() {
      return (
        <p className="auth-error">You must add a photo</p>
      );
    }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li className="auth-error" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    this.state.category = this.state.category || "shirt";
    formData.append('listing[user_id]', this.state.userId);
    formData.append('listing[title]', this.state.title);
    formData.append('listing[price]', this.state.price);
    formData.append('listing[size]', this.state.size);
    formData.append('listing[category]', this.state.category);
    formData.append('listing[brand]', this.state.brand);
    formData.append('listing[description]', this.state.description);

    if ((this.props.formType === "Create Listing") && !this.state.photoFile) {
        this.props.errors.concat("You must upload a photo");
    }
    if (this.state.photoFile) {

      formData.append('listing[photo]', this.state.photoFile);
    }

    if (this.props.formType === "Create Listing") {
      this.props.action(formData).then(newListing => this.props.history.push(`listings/${newlisting.id}`));
    } else {

      formData.append('listing[id]', this.state.id);
      $.ajax({
        url: `/api/listings/${this.state.id}`,
        method: "PATCH",
        data: formData,
        contentType: false,
        processData: false
      }).then(newListing => console.log(newListing));
    }
}
  handleFile(e) {
   const file = e.currentTarget.files[0];
   const fileReader = new FileReader();
   fileReader.onloadend = () => {

     this.setState({photoFile: file, photoUrl: fileReader.result});
   };
   if (file) {
     fileReader.readAsDataURL(file);
   }
  }

  render () {
    console.log(this.props.errors);
    const preview = this.state.photoUrl ? <img className="preview-image" src={this.state.photoUrl} /> : null;
    return (
      <div>
        <div className="listing-form-hero">
          <h1>Turn Your Closet Into Cash</h1>
        </div>

        <form className="listing-form" onSubmit={this.handleSubmit}>

          <div className="listing-details">
          <h3 className="listing-details-title">ALL FIELDS REQUIRED</h3>
          {this.renderErrors()}
          <h3 className="listing-details-title">DETAILS </h3>
          <div className="detail-columns">
            <div className="left-col">
              <select onChange={this.update('category')}className="detail category_field">
                <option value="Shirt">Shirt</option>
                <option value="Jacket">Jacket</option>
                <option value="Pants">Pants</option>
                  <option value="Shoes">Shoes</option>
                <option value="Jewelery">Jewelery</option>
                <option value="Luggage">Luggage</option>
                <option value="Other">Other</option>
              </select>
            <br/>
            <br/>
            <input
              className="detail brand-field"
              type="text"
              placeholder="Brand"
              value={this.state.brand}
              onChange={this.update('brand')} />

            </div>

            <div className="right-col">

            <input
              className="detail size-field"
              type="text"
              placeholder="Size"
              value={this.state.size}
              onChange={this.update('size')} />

              <br/>
              <br/>


            <input
              className="detail title-field"
              type="text"
              placeholder="Item name"
              value={this.state.title}
              onChange={this.update('title')} />

          </div>
          </div>
          </div>

          <label className="listing-details-title">DESCRIPTION</label>
            <textarea
              className="listing-description-field"
              value={this.state.description}
              onChange={this.update('description')} />


          <label className="price-form-label">$
            <input
              className="price-input"
              type="number"
              placeholder="Price (USD)"
              value={this.state.price}
              onChange={this.update('price')} />
          </label>

          <h3>UPLOAD IMAGE </h3>
          {this.updateWarning()}
          <input type="file" onChange={this.handleFile} />

          <br/>
          <br/>

          <h4 className="image-preview-header">Image Preview:</h4>
          <div className="preview-image-container">
          {preview}
          </div>
          <input className="listing-submit" type="submit" value={this.props.formType} />
        </form>
      </div>
    );
  }
}

export default withRouter(ListingForm);
