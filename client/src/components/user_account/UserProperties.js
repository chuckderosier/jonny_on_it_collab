import React, { Component } from "react";
// import UserNavBar from "./UserNavBar";
import styled from "styled-components";
import axios from "axios";
import Geosuggest from "react-geosuggest";

const Container = styled.div`
  height: 70vh;
  width: 100vw;
  .property {
    border: solid 1px rgba(112, 112, 112, 1);
    width: 65vw;
    height: 16vh;
    font-size: 24px;
    text-align: center;
    opacity: 1;
    border-radius: 5px 5px 5px 5px;
    margin-left: 25px;
    margin-bottom: 2vh;
  }
  .propertytext {
    margin-top: -100px;
    padding-bottom: 10px 10px;
  }
  .photo {
    margin-top: 18px;
    margin-left: 5px;
    height: 125px;
    width: 125px;
    border-radius: 50%;
    border: none;
    background-image: url("https://cdnimages.familyhomeplans.com/plans/59952/59952-b.jpg");
    background-position: center;
  }

  .property-flex {
    display: flex;
    flex-wrap: wrap;
  }
`;

const PageFlex = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
`;

const TitleProperty = styled.h1`
  font-size: 40px;
`;

const PropertyFlex = styled.div`
  width: 75vw;
  height: 100vh;
  padding-right: 5vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  h1 {
    text-align: center;
  }
  .OneProperty {
    margin-left: 5vw;
  }
  input {
    width: 20vw;
    text-align: center;
  }
`;

const FormAndGeoBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 80vw;
  height: 35vh;
  font-size: 1.25rem;
  button {
    margin-top: 2vh;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    font-size: 1.25rem;
    &:hover {
      background-color: rgba(19, 212, 171, 1);
      color: white;
    }
  }
  .addProperty {
    text-align: center;
  }
`;

const GeoBox = styled.div`
  display: flex;
  margin-top: 3vh;
  flex-direction: column;
  align-items: center;
  width: 35vw;
  h4 {
    margin-bottom: 3vh;
    text-align: center;
  }
`;

class UserProperties extends Component {
  state = {
    user: {},
    properties: [],
    newProperty: {
      streetAddress: "",
      city: "",
      state: "",
      zipcode: "",
      user: ""
    },
    geoValue: ""
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const id = this.props.match.params.id;
    axios.get(`/api/users/${id}`).then(res => {
      this.setState({ user: res.data, properties: res.data.properties });
    });
  };

  handleChange = event => {
    const updatedNewProperty = { ...this.state.newProperty };
    updatedNewProperty[event.target.name] = event.target.value;
    this.setState({ newProperty: updatedNewProperty });
  };

  handleSubmit = event => {
    event.preventDefault();
    const payload = {
      streetAddress: this.state.newProperty.streetAddress,
      city: this.state.newProperty.city,
      state: this.state.newProperty.state,
      zipcode: this.state.newProperty.zipcode,
      user: this.state.user.id
    };
    console.log(payload);
    axios.post(`/api/properties/`, payload).then(res => {
      this.getData();
    });
  };

  onSuggestSelect = () => {
    const geoValue = document.querySelector(".geosuggest__input").value;
    this.setState({ geoValue: geoValue });
    const geoArr = this.state.geoValue.split(", ");
    let streetAddress = (document.querySelector(".streetAddressInput").value =
      geoArr[0]);
    let city = (document.querySelector(".cityInput").value = geoArr[1]);
    let state = (document.querySelector(".stateInput").value = geoArr[2]);
    const newState = { ...this.state.newProperty, streetAddress, city, state };
    this.setState({ newProperty: newState });
  };

  render() {
    return (
      <Container>
        <PageFlex>
          <PropertyFlex>
            <div>
              <TitleProperty>Manage Properties</TitleProperty>
            </div>
            {/* <PropertyListFlex> */}
            {this.state.properties.map((property, i) => (
              <div className="property-flex">
                <div className="property">
                  <div className="photo" />
                  <div key={i} className="OneProperty">
                    <div className="propertytext">{property.streetAddress}</div>
                    <div>
                      {property.city}, {property.state} {property.zipcode}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* </PropertyListFlex> */}

            <FormAndGeoBox>
              <form onSubmit={this.handleSubmit}>
                <p>
                  Street Address<span className="span">*</span>
                </p>
                <input
                  class="streetAddressInput"
                  type="text"
                  onChange={this.handleChange}
                  name="streetAddress"
                />
                <p>
                  City<span className="span">*</span>
                </p>
                <input
                  class="cityInput"
                  type="text"
                  onChange={this.handleChange}
                  name="city"
                />
                <p>
                  State<span className="span">*</span>
                </p>
                <input
                  class="stateInput"
                  type="text"
                  onChange={this.handleChange}
                  name="state"
                />
                <p>
                  Zip Code<span className="span">*</span>
                </p>
                <input
                  placeholder="Authenticate with zipcode"
                  type="text"
                  onChange={this.handleChange}
                  name="zipcode"
                />
                <br />
                <div className="addProperty">
                  <button type="submit">Add New Property</button>
                </div>
              </form>

              {/* <h1>My Google Map</h1> */}
              <GeoBox>
                <h4>
                  Find your USA-based address below and populate the form
                  automatically!
                </h4>
                <Geosuggest onSuggestSelect={this.onSuggestSelect} />
              </GeoBox>
            </FormAndGeoBox>
          </PropertyFlex>
        </PageFlex>
      </Container>
    );
  }
}

export default UserProperties;
