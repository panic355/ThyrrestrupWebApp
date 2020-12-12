import React from "react";
import Report from "../powerbi/chart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Row, Spinner, Image } from "react-bootstrap";

export default class fetchVechicleList extends React.Component {
  state = {
    loading: true,
    vehicleList: [],
    updateLoading: false,
    response: "",
    error: "",
  };
  async componentDidMount() {
    fetch("/fleet")
      .then((res) => res.json())
      .then((vehicleList) => this.setState({ vehicleList, loading: false }));
    console.log(this.state.vehicleList);
  }

  async handleUpdate() {
    this.setState({ updateLoading: true });
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command: "update" }),
    };

    let response = await fetch("/updateMachine", requestOptions);
    if (response.status == 200) {
      this.setState({ error: "green" });
    } else {
      this.setState({ error: "red" });
    }
    let obj = await response.json();
    this.setState({
      updateLoading: false,
      response: obj.message,
    });
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
        <a className="list-group-item list-group-item-action active" style={{top:"-24px"}}>
          <div class="d-flex w-100 justify-content-between">
            <h5 class="headline">Din flåde</h5>
          </div>
          <p className="sub-title">Oversigt over dine maskiner.</p>
        </a>
        {this.state.vehicleList.map((vehicle) => (
          <div className="content">
            <div key={vehicle.vehicleID}>
              <a className="list-group-item list-group-item-action" style={{}}>
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="machineNr">Maskine nummer: {vehicle.vehicleID}</h5>
                </div>
                <div>
                  <Image src="https://cdn.lfmedia.dk/CMSContent/Media/PageContent/Max/22784.jpg" rounded width='175' height='100'/>
                  <p className="mb-1">Type: {vehicle.type}</p>
                  <p className="mb-1">
                    Timer siden sidste motor servicecheck:{" "}
                    {vehicle.timeSinceMotService}
                  </p>
                  <p className="mb-1">Person nummer: {vehicle.personID}</p>
                  <Row>
                    <Button
                      variant="btn btn-primary mr-1"
                      type="submit"
                      href={`/vehicle`}
                    >
                      Gå til maskine
                    </Button>

                    <Button
                      variant="btn btn-primary mr-1"
                      type="submit"
                      href={`/editMachine/${vehicle.vehicleID}`}
                    >
                      Rediger maskine
                    </Button>

                    <Button
                      variant="btn btn-primary mr-1"
                      type="submit"
                      href={`/deleteMachine/${vehicle.vehicleID}`}
                    >
                      Slet Maskine
                    </Button>

                    <Button
                      variant="btn btn-primary mr-1"
                      type="submit"
                      href={`/service/${vehicle.vehicleID}`}
                    >
                      Servicer maskine
                    </Button>

                    <Button
                      variant="btn btn-primary mr-1"
                      disabled={this.state.updateLoading}
                      type="submit"
                      onClick={() => this.handleUpdate()}
                    >
                      Opdater maskine&nbsp;
                      {this.state.updateLoading && (
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                    </Button>
                    <p style={{ color: this.state.error, marginLeft: "10px" }}>
                      {this.state.response}
                    </p>
                  </Row>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
