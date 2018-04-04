import React, { Component } from 'react';
import { Stage, Layer, Circle, RegularPolygon, Wedge } from 'react-konva';
import { range } from 'lodash';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    segmentCount: 8,
    diameter: 10.25,
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

  handleSegmentChange = (count) => {
    this.setState({
      segmentCount: count,
    });
  }

  handleDiameterChange = (diameter) => {
    this.setState({
      diameter: diameter,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='Segmented'>

            <Stage width={250} height={250}>
              <Layer>
                <RegularPolygon
                  sides={this.state.segmentCount}
                  x={125}
                  y={125}
                  radius={125}
                  fill={'white'}
                  stroke={'black'}
                  strokeWidth={1}
                />
                {
                  range(this.state.segmentCount).map((num) => {
                    return (
                      <Wedge
                        x={125}
                        y={125}
                        radius={125}
                        angle={360 / this.state.segmentCount}
                        rotation={((360 / this.state.segmentCount) * num) - 90}
                        stroke={'#222'}
                        strokeWidth={2}
                        opacity={1}
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
                  fill={'#222'}
                  stroke={'black'}
                  strokeWidth={1}
                />
              </Layer>

            </Stage>
          </div>
          <h1 className="App-title">Segmented</h1>
        </header>
        <p className="App-intro">
          Segment Count: {this.state.segmentCount}
        </p>
        <p className="App-intro">
          Segment Degrees: {`${this.degrees()}°`}
        </p>
        <p className="App-intro">
          Diameter: {`${this.state.diameter}"`}
        </p>
        <p className="App-intro">
          Segment Length: {`${this.segmentLength()}"`}
        </p>
        <p className="App-intro">
          Board Length: {`${this.boardLength()}"`}
        </p>
        <div className='sliders'>

          <div className="left-slider">
            <p>{`Number of Segments: ${this.state.segmentCount}`}</p>
            <Slider step={1} defaultValue={6} min={4} max={50} onChange={this.handleSegmentChange} />
          </div>
          <div className="right-slider">
            <p>{`Diameter: ${this.state.diameter}"`}</p>
            <Slider step={0.25} defaultValue={10.25} min={4} max={50} onChange={this.handleDiameterChange} />
          </div>
        </div>


      </div >
    );
  }
}

export default App;
