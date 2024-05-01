import "./App.css";
import DNDContainer from "./components/DNDContainer/DNDContainer";

function App() {
  return (
    <DNDContainer className="dnd-container">
      <div className="dnd-item">First item</div>
      <div className="dnd-item">Second item</div>
      <div className="dnd-item">Third item</div>
      <div className="dnd-item">Fourth item</div>
      <div className="dnd-item">Fifth item</div>
      <div className="dnd-item">Sixth item</div>
      <div className="dnd-item">Seventh item</div>
    </DNDContainer>
  );
}

export default App;
