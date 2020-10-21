import React from 'react';
import ReactDOM from 'react-dom';
import { Button, TextField, Container, Grid, Input, Box } from '@material-ui/core'

/**
 * Create a canvas with as a region visual displaying output 
 */
class Canvas extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    const ctx    = canvas.getContext("2d");
    const mN     = this.makeMn(); 
    const mD     = this.makeMd(); 

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clearing the canvas

    // Print the name of the nodes in GREEN 
    for (const i in mN) {
      ctx.fillStyle="Green"
      ctx.fillText(mN[i].name, mN[i].x, mN[i].y)
    }
    // Print the name of the nodes in BLUE
    for (const i in mD) {
      ctx.fillStyle="blue"
      ctx.fillText(mD[i].name, mD[i].x, mD[i].y)
    }
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current
    const ctx    = canvas.getContext("2d");
    const mN     = this.makeMn(); 
    const mD     = this.makeMd(); 

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clearing the canvas

    // Print the name of the nodes in GREEN 
    for (const i in mN) {
      ctx.fillStyle="Green"
      ctx.fillText(mN[i].name, mN[i].x, mN[i].y)
    }
    // Print the name of the nodes in BLUE
    for (const i in mD) {
      ctx.fillStyle="blue"
      ctx.fillText(mD[i].name, mD[i].x, mD[i].y)
    }
  }

  render() {
    return <canvas ref={this.canvasRef}/>
  }

  // Return an array of nodes that have the NAME input by the user
  makeMn() {
    const dataset  = this.props.data
    const name     = this.props.name
    const mN       = [];

    Object.keys(dataset).forEach((index) => {
      if (dataset[index].name === name || dataset[index].connections.includes(name)) {
        mN.push(dataset[index])
      }
    })

    return mN
  }

  // Return an array of nodes that has the shorter distance than the distance input by the user
  makeMd() {
    const mN = this.makeMn(); 
    const mD = []
    const distance = this.props.distance
    const startPoint = this.findStartPoint(mN);

    for (const i in mN) {
      if (this.calcDist(startPoint, mN[i]) <= distance) {
        mD.push(mN[i])
      }
    }

    return mD
  }

  // Find the starting point from an array of nodes
  findStartPoint(data) {
    for (const i in data) {
      if (data[i].name === this.props.name) {
        return data[i]
      }
    }
  }

  // Calculate the distance between two nodes 
  calcDist(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }
}

class App extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      name     : '',
      distance : '',
      data     : []
    } 
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.file         = React.createRef(); 
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Box component="div" display="block">
          <form className="form" onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth type="text" name="name" label="Name" onChange={this.handleChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth type="number" name="distance" label="Distance" onChange={this.handleChange}/>          
            </Grid>
            <Grid item xs={12}>
              <Input fullWidth disableUnderline type="file" name="file" inputRef={this.file}/>                
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" onClick={this.handleSubmit} >
                Submit
              </Button>
            </Grid>
          </Grid>
          </form>
        </Box>
        <Canvas data={this.state.data} name={this.state.name} distance={this.state.distance}/>
      </Container>
    );
  }

  // To handle change in value of input
  handleChange(event) {
    const nam = event.target.name;
    const val = event.target.value; 
    this.setState({ [nam] : val });
  }

  // To handle form submission
  handleSubmit(event) {
    event.preventDefault(); 
    const fileReader = new FileReader(); 
    fileReader.readAsText(this.file.current.files[0])
    fileReader.onload = () => {
      const data = JSON.parse(fileReader.result)
      this.setState({ data : data })
    }
  }
}
// ========================================
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

