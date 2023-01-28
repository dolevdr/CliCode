import './App.css';

function App() {
  const pageStyle={
    background: 'linear-gradient(to left, #04052E,#140152, #22007C)',
    width:'100%',
    height:window.innerHeight
  }
  return (
    <div className='page' style={pageStyle}>
      <p>מה לובשים עכשיו</p>      
    </div>
  );
}

export default App;
