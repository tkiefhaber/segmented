import React, { Component } from 'react';
import { Stage, Layer, Circle, RegularPolygon, Wedge } from 'react-konva';
import { range } from 'lodash';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    segmentCount: 12,
    diameter: 10,
  }

  degrees = () => {
    const { segmentCount } = this.state;
    return Math.round((90 - (segmentCount - 2) * 90 / segmentCount) * 16) / 16;
  }

  segmentLength = () => {
    const { diameter, segmentCount } = this.state;
    return Math.round((Math.PI * diameter / segmentCount * 1.06) * 16) / 16;
  }

  boardLength = () => {
    const { diameter } = this.state;
    return Math.ceil(Math.PI * diameter * 1.1);
  }

  handleSegmentChange = (event) => {
    this.setState({
      segmentCount: event.target.value,
    });
  }

  handleDiameterChange = (event) => {
    this.setState({
      diameter: event.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Segment</h1>
        </header>
        <p className="App-intro">
          Segment Count: {this.state.segmentCount}
        </p>
        <p className="App-intro">
          Segment Degrees: {this.degrees()}
        </p>
        <p className="App-intro">
          Diameter: {this.state.diameter}
        </p>
        <p className="App-intro">
          Segment Length: {this.segmentLength()}
        </p>
        <p className="App-intro">
          Board Length: {this.boardLength()}
        </p>
        <input type='text' value={this.state.segmentCount} placeholder='segments' onChange={this.handleSegmentChange} />
        <input type='text' value={this.state.diameter} placeholder='diameter' onChange={this.handleDiameterChange} />

        <div className='Segmented'>

          <Stage width={250} height={250}>
            <Layer>
              <RegularPolygon
                sides={this.state.segmentCount}
                x={125}
                y={125}
                radius={125}
                fill={'papayawhip'}
                stroke={'black'}
                strokeWidth={1}
              />
              {
                range(this.state.segmentCount).map((num) => {
                  console.log('num', num);
                  console.log('rotation', (360 / this.state.segmentCount) * num);
                  return (
                    <Wedge
                      x={125}
                      y={125}
                      radius={125}
                      angle={360 / this.state.segmentCount}
                      rotation={((360 / this.state.segmentCount) * num) - 90}
                      fill={'papayawhip'}
                      stroke={'black'}
                      strokeWidth={1}
                      opacity={0.2}
                      key={num}
                    />
                  );
                })
              }
              <RegularPolygon
                sides={this.state.segmentCount}
                x={125}
                y={125}
                radius={100}
                fill={'white'}
                stroke={'black'}
                strokeWidth={1}
              />
            </Layer>

          </Stage>
        </div>
      </div >
    );
  }
}

export default App;
