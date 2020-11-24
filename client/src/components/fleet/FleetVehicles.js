import React from "react";


export default class fetchVechicleList extends React.Component {
  state = {
    loading: true,
    vehicleList: [],
  };
  async componentDidMount() {
    fetch("/fleet")
      .then((res) => res.json())
      .then((vehicleList) => this.setState({ vehicleList, loading: false }));
      console.log(this.state.vehicleList);
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    if (!this.state.vehicleList.length) {
      return <div>Didn't get a vehicle</div>;
    }
    return (
      <div>
        <a className="list-group-item list-group-item-action active">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="headline">Din flåde</h5>
          </div>
          <p className="sub-title">Oversigt over dine maskiner.</p>
        </a>
        {this.state.vehicleList.map((vehicle) => (
          <div className="content">
            <div key={vehicle.vehicleID}>
              <a className="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="machineNr">Maskine nummer: {vehicle.vehicleID}</h5>
                </div>
                <div>
                  <img
                    src="https://cdn.lfmedia.dk/CMSContent/Media/PageContent/Max/22784.jpg"
                    className="card-img-top"
                    style={{
                      width: 175,
                      height: 100,
                      position: "left",
                      top: this.props.top,
                      left: this.props.left,
                    }}
                    alt="..."
                  ></img>
                  <p className="mb-1">Type: {vehicle.type}</p>
                  <p className="mb-1">
                    Timer siden sidste motor servicecheck:{" "}
                    {vehicle.timeSinceMotService}
                  </p>
                  <p className="mb-1">Person nummer: {vehicle.personID}</p>
                  <input
                    type="submit"
                    value="Gå til maskine"
                    className="btn btn-primary mr-1"
                    onClick={() =>
                      (window.location.href = "/vehicle/" + vehicle.vehicleID)
                    }
                  />
                  <input
                    type="submit"
                    value="Rediger maskine"
                    className="btn btn-primary mr-1"
                    onClick={() =>
                      (window.location.href =
                        "/editMachine/" + vehicle.vehicleID)
                    }
                  />
                  <input
                    type="submit"
                    value="Slet Maskine"
                    className="btn btn-primary mr-1"
                    onClick={() =>
                      (window.location.href =
                        "/deleteMachine/" + vehicle.vehicleID)
                    }
                  />
                  <input
                    type="submit"
                    value="Servicer maskine"
                    className="btn btn-primary mr-1"
                    onClick={() =>
                      (window.location.href = "/service/" + vehicle.vehicleID)
                    }
                  />
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    );
    /*{this.state.vehicleList.map(vehicle => (
        <div key={vehicle.vehicleID}>
        <div> {vehicle.vehicleID} </div>
        <div> {vehicle.timeSinceMotService} </div>
        </div>*/
  }
}
